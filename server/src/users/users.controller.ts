import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PassTest } from './dto';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as PDFDocument from 'pdfkit';
import * as jwt from 'jsonwebtoken';
import * as pdfParse from 'pdf-parse';
const path = require('path');

export const getNormalDate = (date: Date) => {
    return new Date(date).toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', });
}

interface ICreatePDF {
    name: string
    email: string
    courseId: number
    signature: string
    courseName: string
}

@Controller('users')
export class UsersController {
    constructor(
        private prisma: PrismaService
    ) { }

    @Get('get-by-id-test')
    async getTestById(@Query('id') id: string) {
        const testId = Number(id);

        const res = await this.prisma.test.findUnique({
            where: {
                id: testId,
            },

            include: {
                Questions: {
                    include: {
                        AnswerOptions: true
                    }
                }
            }
        });

        console.log(res)

        return res;
    }

    @UseGuards(Jwt2faAuthGuard)
    @Get('get-passed-courses')
    async getPassedCourses(@Req() req) {
        const userId = req.user.id

        const foundTestResults = await this.prisma.testResults.findMany({
            where: {
                userId: Number(userId)
            },
            include: {
                Test: true,
            }
        });

        const passedTests = [];

        for (let result of foundTestResults) {
            if (result.score >= result.Test.minimumQuestionsAnswered) {
                passedTests.push(result.testId)
            }
        }

        let passedCourses = [];

        const allCourses = await this.prisma.course.findMany({
            include: {
                CourseTestRelation: true,
                Users: true
            }
        });

        for (let course of allCourses) {
            const neededTests = course.CourseTestRelation;
            if (neededTests.length === 0) continue;

            let isPassed = true;

            for (let test of neededTests) {
                if (!passedTests.includes(test.testId)) {
                    isPassed = false;
                    break;
                }
            }

            if (isPassed) {
                passedCourses.push(course);
            }
        }

        return passedCourses;
    }

    @UseGuards(Jwt2faAuthGuard)
    @Post('pass-test')
    async passTest(@Body() body: PassTest, @Req() req) {
        const foundTest = await this.prisma.test.findUnique({
            where: {
                id: body.testId
            },

            include: {
                Questions: {
                    include: {
                        AnswerOptions: true
                    }
                }
            }
        });

        let score = 0;

        for (var prop in body.answers) {
            const chosenAnswerId = body.answers[prop];

            const foundQuestion = foundTest.Questions.find(el => el.id === Number(prop));

            if (foundQuestion) {
                const correctAnswerForThisQuestion = foundQuestion.AnswerOptions.find(el => el.isCorrect);

                if (correctAnswerForThisQuestion.id === chosenAnswerId) {
                    score++;
                }
            }
        }

        const foundResult = await this.prisma.testResults.findFirst({
            where: {
                userId: req.user.id,
                testId: body.testId,
                score
            }
        })

        if (foundResult) {
            await this.prisma.testResults.update({
                where: {
                    id: foundResult.id
                },
                data: {
                    score
                }
            })
        } else {
            await this.prisma.testResults.create({
                data: {
                    userId: req.user.id,
                    testId: body.testId,
                    score
                }
            })
        }

        return {
            score
        }
    }

    async createPdf({ name, email, courseId, signature, courseName }: ICreatePDF): Promise<Buffer> {
        const foundCourse = await this.prisma.course.findUnique({
            where: {
                id: courseId
            }
        })

        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];
            doc.on('data', data => buffers.push(data));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', err => reject(err));

            const logoPath = path.join(__dirname, '..', '..', '/src/users/1yIEAIwIBOM.png');
            doc.image(logoPath, 50, 30, { width: 100 });

            const fontPath = path.join(__dirname, '..', '..', '/src/users/Roboto-Regular.ttf');

            doc.font(fontPath);
            // Оформление заголовка
            doc.fontSize(25).text('Сертификат за пройденный курс', 100, 50, { align: 'center' });
            // Информация о пользователе и результате
            doc.fontSize(16).text(`Имя: ${name}`, 100, 120);
            doc.fontSize(16).text(`Email: ${email}`, 100, 150);
            doc.fontSize(16).text(`Наименование курса: ${foundCourse.headline}`, 100, 180);
            // Подпись (цифровая подпись в текстовом виде)
            doc.fontSize(10).text(`Цифровая подпись: ${signature}`, 100, 250);

            // Декоративная линия под подписью
            doc.strokeColor('blue').lineWidth(2).moveTo(100, 420).lineTo(300, 420).stroke();

            // Дата выдачи
            doc.fontSize(16).text(`Дата выпуска: ${getNormalDate(new Date())}`, 100, 390);

            doc.end();
        });
    }

    createToken(data: any): string {
        return jwt.sign(data, process.env.JWT_SECRET);
    }

    @UseGuards(Jwt2faAuthGuard)
    @Get('create-pdf')
    async createPdfGet(@Response() res, @Req() req, @Query('courseId') courseId: string) {
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id: Number(req.user.id)
            }
        })

        const foundCourse = await this.prisma.course.findUnique({
            where: {
                id: Number(courseId)
            }
        })

        const signature = this.createToken({ name: foundUser.name, email: foundUser.email, courseId: courseId, courseName: foundCourse.headline, date: new Date() });
        const pdfBuffer = await this.createPdf({ name: foundUser.name, email: foundUser.email, courseName: foundCourse.headline, courseId: Number(courseId), signature });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=profile.pdf');
        res.send(pdfBuffer);
    }

    @Post('upload-pdf')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Response() res) {
        try {
            const data = await pdfParse(file.buffer);
            const text = data.text;
            // Предполагается, что JWT закодирован прямо в тексте PDF, возможно, заключен в какие-то разделители
            const token = this.extractToken(text);
            if (!token) {
                throw new BadRequestException('No JWT found in the PDF')
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Используйте ваш ключ или метод проверки
            console.log(decoded, 'decoded');

            res.send(decoded)
        } catch (error) {
            console.log(error);

            throw new BadRequestException('Error processing PDF')
        }
    }

    private extractToken(text: string): string | null {

        const signatureIndex = text.indexOf('Цифровая подпись:');
        const dateOfIssueIndex = text.indexOf('Дата выпуска:');
        if (signatureIndex === -1 || dateOfIssueIndex === -1) {
            return null;  // Не найден начальный или конечный маркер
        }
        // Вырезаем часть текста между этими индексами
        const signatureText = text.substring(signatureIndex + 'Цифровая подпись:'.length, dateOfIssueIndex).trim();
        // Очищаем от всех неалфавитно-цифровых символов, кроме точек, составляющих структуру JWT
        const cleanSignature = signatureText.replace(/\n/g, '');
        return cleanSignature;
    }

    @UseGuards(Jwt2faAuthGuard)
    @Get('get-username')
    async getUsername(@Req() req) {
        const id = req.user.id

        return await this.prisma.users.findUnique({
            where: {
                id
            },
            select: {
                name: true
            }
        })
    }
}

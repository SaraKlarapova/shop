import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTest, DeleteTest } from './dto';

@Controller('tests')
export class TestsController {
    constructor(
        private prisma: PrismaService
    ) { }


    @Get('/get')
    async getTests() {
        const tests = await this.prisma.test.findMany({
            include: {
                Questions: {
                    include: {
                        AnswerOptions: true
                    }
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return tests;
    }

    @Post('/create')
    async createTest(@Req() request, @Body() body: CreateTest) {

        const createTest = await this.prisma.test.upsert({
            where: {
                id: body.id || -1
            },
            create: {
                headline: body.headline,
                minimumQuestionsAnswered: body.minpass
            },
            update: {
                headline: body.headline,
                minimumQuestionsAnswered: body.minpass
            }
        })

        await this.prisma.answerOptions.deleteMany({
            where: {
                Questions: {
                    testId: body.id || -1
                }
            }
        })

        await this.prisma.questions.deleteMany({
            where: {
                testId: body.id || -1
            }
        })

        for (let questions of body.questions) {
            const createdQuestion = await this.prisma.questions.create({
                data: {
                    question: questions.question,
                    testId: createTest.id
                }
            })

            for (let answerOption of questions.AnswerOptions) {

                await this.prisma.answerOptions.create({
                    data: {
                        asnwer: answerOption.asnwer,
                        isCorrect: answerOption.isCorrect,
                        questionId: createdQuestion.id
                    }
                })

            }
        }
    }

    // @Post('delete')
    // async DeleteTest(@Body() { id }: DeleteTest) {

    //     const foundQuestions = await this.prisma.questions.findMany({
    //         where: {
    //             testId: id
    //         }
    //     })
        
    //     for (const foundQuestion of foundQuestions) {
    //         await this.prisma.answerOptions.deleteMany({
    //             where: {
    //                 questionId: foundQuestion.id
    //             }
    //         })
    //     }

    //     await this.prisma.questions.deleteMany({
    //         where: {
    //             testId: id
    //         }
    //     })

    //     await this.prisma.test.delete({
    //         where: {
    //             id
    //         }
    //     })

    // }
}

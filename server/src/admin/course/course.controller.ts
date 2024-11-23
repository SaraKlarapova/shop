import { BadRequestException, Body, Controller, Get, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMember, Option, Upsert } from './dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from 's3/s3.service';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';
import { convertToStandardObject } from 'utils';
import { AuthService } from 'auth/auth.service';

@Controller('course')
export class CourseController {
    constructor(
        private prisma: PrismaService,
        private s3: S3Service,
        private authService: AuthService
    ) { }

    @UseGuards(Jwt2faAuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'fileImage', maxCount: 1 },
        { name: 'fileVideo', maxCount: 1 },
    ]))
    @Post('/create')
    async create(
        @Body() { text, textPreview, video, image, headline, id, linkVk, linkTelegram, minutes, relatedTests, price }: Upsert,
        @UploadedFiles() files: { fileImage?: Express.Multer.File[], fileVideo?: Express.Multer.File[] },
        @Req() req
    ) {
        const userId = req.user.id

        let linkImage = image;
        let linkVideo = video;

        if (!files || !files.fileImage || !files.fileImage[0]) {
            if (!image) {
                throw new BadRequestException('Wrong images');
            }
        }

        const fileVideo = files?.fileVideo?.[0];
        const fileImage = files?.fileImage?.[0];

        if (fileImage) {
            linkImage = await this.s3.uploadFile(fileImage);
        }

        if (fileVideo) {
            linkVideo = await this.s3.uploadFile(fileVideo);
        }

        const createdCourse = await this.prisma.course.upsert({
            where: {
                id: Number(id) || -1
            },
            create: {
                text: text as any,
                textPreview: textPreview as any,
                video: linkVideo,
                image: linkImage,
                headline,
                userId,
                linkVk,
                linkTelegram,
                price: Number(price),
                minutes: Number(minutes) || 0,
            },
            update: {
                text: text as any,
                textPreview: textPreview as any,
                video: linkVideo,
                image: linkImage,
                headline,
                userId,
                linkVk,
                linkTelegram,
                price: Number(price),
                minutes: Number(minutes) || 0
            }
        })

        if (id) {
            await this.prisma.logs.create({
                data: {
                    type: 'EDIT',
                    courseId: createdCourse.id
                }
            })
        } else {
            await this.prisma.logs.create({
                data: {
                    type: 'ADD',
                    courseId: createdCourse.id
                }
            })
        }

        await this.prisma.courseTestRelation.deleteMany({
            where: {
                courseId: createdCourse.id
            }
        })

        let pop = [];

        const categoriesEquipments: Option[] = convertToStandardObject(relatedTests);

        for (let test of categoriesEquipments) {
            pop.push(
                this.prisma.courseTestRelation.create({
                    data: {
                        testId: Number(test.value),
                        courseId: createdCourse.id
                    }
                })
            )
        }

        await this.prisma.$transaction(pop);
    }

    @Get('/get')
    async get() {
        return await this.prisma.course.findMany({
            include: {
                Users: true,
                CourseTestRelation: {
                    include: {
                        Test: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    @Get('/get-count-of-members')
    async getCountOfMembers(@Query('id') id: string | number) {
        return await this.prisma.membersOfCourse.count({
            where: {
                courseId: Number(id),
            }
        })
    }

    @Get('/get-preview-course')
    async getPreviewCourse(@Query('id') id: string | number, @Req() req) {
        const [bearer, token] = req.headers.authorization.split(' ');
        let decoded;
        let foundMember;

        const course = await this.prisma.course.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                Users: {
                    select: {
                        name: true
                    }
                },
                image: true,
                textPreview: true,
                linkTelegram: true,
                linkVk: true,
                headline: true,
                createdAt: true
            }
        })

        try {
            decoded = await this.authService.verifyToken(token)
            
            foundMember = await this.prisma.membersOfCourse.findFirst({
                where: {
                    userId: decoded.id,
                    courseId: Number(id)
                }
            })

            
        }
        catch (err) {
            foundMember = undefined
        }

        return {
            course,
            foundMember
        }
    }

    @UseGuards(Jwt2faAuthGuard)
    @Get('/get-full-course')
    async getFullCourse(@Query('id') id: string | number, @Req() req) {
        const userId = req.user.id

        const course = await this.prisma.course.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Users: {
                    select: {
                        name: true
                    }
                },
                CourseTestRelation: {
                    include: {
                        Test: true
                    }
                }
            }
        })

        const foundMember = await this.prisma.membersOfCourse.findFirst({
            where: {
                userId,
                courseId: Number(id)
            }
        })

        return {
            course,
            foundMember
        }
    }

    @UseGuards(Jwt2faAuthGuard)
    @Post('/create-member')
    async createMember(@Body() { id }: CreateMember, @Req() req) {
        const userId = req.user.id

        const foundMember = await this.prisma.membersOfCourse.findFirst({
            where: {
                userId,
                courseId: Number(id)
            }
        })

        if (!foundMember) {
            return await this.prisma.membersOfCourse.create({
                data: {
                    userId,
                    courseId: Number(id)
                }
            })
        } else {
            return
        }
    }
}

import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { S3Module } from 's3/s3.module';

@Module({
  controllers: [CourseController],
  imports: [S3Module]
})
export class CourseModule {}

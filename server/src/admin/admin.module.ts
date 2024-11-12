import { Module } from '@nestjs/common';
import { TestsModule } from './tests/tests.module';
import { CourseModule } from './course/course.module';
import { S3Module } from 's3/s3.module';

@Module({
    imports: [TestsModule, CourseModule, S3Module]
})
export class AdminModule {
}

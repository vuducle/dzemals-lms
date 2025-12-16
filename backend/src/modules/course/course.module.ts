import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeacherModule } from '../teacher/teacher.module';
import { TeacherAuthGuard } from '../../guards/teacher-auth.guard';

@Module({
  imports: [PrismaModule, TeacherModule],
  controllers: [CourseController],
  providers: [CourseService, TeacherAuthGuard],
})
export class CourseModule {}

import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { StudentModule } from '../student/student.module';
import { StudentAuthGuard } from '../../guards/student-auth.guard';

@Module({
  imports: [PrismaModule, StudentModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, StudentAuthGuard],
})
export class EnrollmentModule {}

import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [PrismaModule, TeacherModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}

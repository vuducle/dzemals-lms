import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateScheduleDto } from './dto';
import { CreateScheduleDto } from '../course/dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new schedule for a course (teacher only, must own the course)
   */
  async createSchedule(
    teacherId: string,
    courseId: string,
    createDto: CreateScheduleDto,
  ) {
    const course = await this.prisma.client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    // Check if teacher owns the course
    if (course.teacherId !== teacherId) {
      throw new ForbiddenException(
        'You do not have permission to add schedules to this course',
      );
    }

    return this.prisma.client.schedule.create({
      data: {
        ...createDto,
        courseId,
      },
    });
  }

  /**
   * Get all schedules for a course
   */
  async getSchedulesByCourse(courseId: string) {
    const course = await this.prisma.client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    return this.prisma.client.schedule.findMany({
      where: { courseId },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  /**
   * Get a specific schedule entry by ID
   */
  async getScheduleById(scheduleId: string) {
    const schedule = await this.prisma.client.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    return schedule;
  }

  /**
   * Update a schedule entry (teacher only, must own the course)
   */
  async updateSchedule(
    teacherId: string,
    scheduleId: string,
    updateDto: UpdateScheduleDto,
  ) {
    const schedule = await this.prisma.client.schedule.findUnique({
      where: { id: scheduleId },
      include: { course: true },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    // Check if teacher owns the course
    if (schedule.course.teacherId !== teacherId) {
      throw new ForbiddenException(
        'You do not have permission to update this schedule',
      );
    }

    return this.prisma.client.schedule.update({
      where: { id: scheduleId },
      data: updateDto,
    });
  }

  /**
   * Delete a schedule entry (teacher only, must own the course)
   */
  async deleteSchedule(teacherId: string, scheduleId: string) {
    const schedule = await this.prisma.client.schedule.findUnique({
      where: { id: scheduleId },
      include: { course: true },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    // Check if teacher owns the course
    if (schedule.course.teacherId !== teacherId) {
      throw new ForbiddenException(
        'You do not have permission to delete this schedule',
      );
    }

    return this.prisma.client.schedule.delete({
      where: { id: scheduleId },
    });
  }

  /**
   * Get schedules for a course with course details (public endpoint)
   */
  async getCoursesSchedulesByCode(courseCode: string) {
    const course = await this.prisma.client.course.findUnique({
      where: { code: courseCode },
      include: {
        schedule: {
          orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with code ${courseCode} not found`);
    }

    return {
      course: {
        id: course.id,
        title: course.title,
        code: course.code,
        description: course.description,
        room: course.room,
        startDate: course.startDate,
        endDate: course.endDate,
      },
      schedules: course.schedule,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TeacherAuthGuard } from '../../guards/teacher-auth.guard';
import { UpdateScheduleDto, GetScheduleResponseDto } from './dto';
import { CreateScheduleDto } from '../course/dto';

@ApiTags('Schedules')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * Create a new schedule for a course (teacher only)
   */
  @Post('course/:courseId')
  @UseGuards(JwtAuthGuard, TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new schedule for a course (teacher only)',
    description:
      'Add a new schedule entry to a course. Only the teacher who owns the course can create.',
  })
  @ApiResponse({
    status: 201,
    description: 'Schedule created',
    type: GetScheduleResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the course owner' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async createSchedule(
    @Param('courseId') courseId: string,
    @Body() createDto: CreateScheduleDto,
    @Request() req,
  ) {
    return this.scheduleService.createSchedule(
      req.teacher.id,
      courseId,
      createDto,
    );
  }

  /**
   * Get all schedules for a specific course (public)
   */
  @Get('course/:courseId')
  @ApiOperation({
    summary: 'Get all schedules for a course',
    description:
      'Public endpoint to retrieve all schedules for a given course ID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of schedules',
    type: [GetScheduleResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getSchedulesByCourse(@Param('courseId') courseId: string) {
    return this.scheduleService.getSchedulesByCourse(courseId);
  }

  /**
   * Get schedules for a course by course code (public)
   */
  @Get('course-code/:courseCode')
  @ApiOperation({
    summary: 'Get course and its schedules by course code',
    description:
      'Public endpoint to retrieve course details with all schedules',
  })
  @ApiResponse({
    status: 200,
    description: 'Course and schedules',
    schema: {
      example: {
        course: {
          id: 'cmj6vcg7t0004u7rb087ccqah',
          title: 'Introduction to Web Development',
          code: 'CS101',
          description: 'Learn the fundamentals of Web Development',
          room: 'Room 101',
          startDate: '2025-10-01T00:00:00.000Z',
          endDate: '2026-03-31T00:00:00.000Z',
        },
        schedules: [
          {
            id: 'schedule123',
            courseId: 'cmj6vcg7t0004u7rb087ccqah',
            dayOfWeek: 1,
            startTime: '10:00',
            endTime: '12:00',
            room: null,
            createdAt: '2025-12-15T08:05:20.535Z',
            updatedAt: '2025-12-15T08:05:20.535Z',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCoursesSchedulesByCode(@Param('courseCode') courseCode: string) {
    return this.scheduleService.getCoursesSchedulesByCode(courseCode);
  }

  /**
   * Get a specific schedule by ID (public)
   */
  @Get(':scheduleId')
  @ApiOperation({
    summary: 'Get a specific schedule by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Schedule details',
    type: GetScheduleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async getScheduleById(@Param('scheduleId') scheduleId: string) {
    return this.scheduleService.getScheduleById(scheduleId);
  }

  /**
   * Update a schedule (teacher only, must own the course)
   */
  @Put(':scheduleId')
  @UseGuards(JwtAuthGuard, TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a schedule (teacher only)',
    description:
      'Update schedule details. Only the teacher who owns the course can update.',
  })
  @ApiResponse({
    status: 200,
    description: 'Schedule updated',
    type: GetScheduleResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the course owner' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async updateSchedule(
    @Param('scheduleId') scheduleId: string,
    @Body() updateDto: UpdateScheduleDto,
    @Request() req,
  ) {
    return this.scheduleService.updateSchedule(
      req.teacher.id,
      scheduleId,
      updateDto,
    );
  }

  /**
   * Delete a schedule (teacher only, must own the course)
   */
  @Delete(':scheduleId')
  @UseGuards(JwtAuthGuard, TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a schedule (teacher only)',
    description:
      'Delete a schedule entry. Only the teacher who owns the course can delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'Schedule deleted',
    schema: {
      example: {
        message: 'Schedule deleted successfully',
        id: 'schedule123',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the course owner' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async deleteSchedule(
    @Param('scheduleId') scheduleId: string,
    @Request() req,
  ) {
    await this.scheduleService.deleteSchedule(req.teacher.id, scheduleId);
    return {
      message: 'Schedule deleted successfully',
      id: scheduleId,
    };
  }
}

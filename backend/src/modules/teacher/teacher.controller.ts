import {
  Controller,
  Patch,
  Body,
  UseGuards,
  Request,
  Get,
  Post,
  Delete,
  Param,
  Query,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TeacherService } from './teacher.service';
import { TeacherAuthGuard } from '../../guards/teacher-auth.guard';
import {
  UpdateUserRoleDto,
  CreateGradeDto,
  UpdateGradeDto,
  GetMyCoursesQueryDto,
} from './dto';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Patch('users/role')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Grant or revoke teacher role (Teacher only)',
  })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 200,
    description: 'User role updated successfully',
    schema: {
      example: {
        message: 'Armin Dorri is now a teacher',
        user: {
          id: 'clz123xyz',
          email: 'armin.dorri@example.com',
          firstName: 'Armin',
          lastName: 'Dorri',
          isTeacher: true,
          isStudent: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Only teachers can assign roles, or user not found, or already has role',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async updateUserRole(
    @Request() req,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.teacherService.updateUserRole(
      req.user.sub,
      updateUserRoleDto.userId,
      updateUserRoleDto.isTeacher,
    );
  }

  @Get('me')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my teacher profile' })
  @ApiResponse({ status: 200, description: 'Teacher profile data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyProfile(@Request() req) {
    return this.teacherService.getMyTeacherProfile(req.user.sub);
  }

  @Get('my-courses')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my courses with pagination' })
  @ApiResponse({ status: 200, description: 'List of my courses' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyCourses(@Request() req, @Query() query: GetMyCoursesQueryDto) {
    return this.teacherService.getMyCourses(req.user.sub, query);
  }

  @Get('courses/:courseId/enrollments')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get students enrolled in my course' })
  @ApiResponse({ status: 200, description: 'List of enrollments' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getEnrollmentsByCourse(@Request() req, @Param('courseId') courseId: string) {
    return this.teacherService.getEnrollmentsByCourse(req.user.sub, courseId);
  }

  @Post('grades')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign a grade to a student' })
  @ApiResponse({ status: 201, description: 'Grade assigned' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async assignGrade(@Request() req, @Body() createGradeDto: CreateGradeDto) {
    return this.teacherService.assignGrade(req.user.sub, createGradeDto);
  }

  @Patch('grades/:gradeId')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a grade' })
  @ApiResponse({ status: 200, description: 'Grade updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  async updateGrade(
    @Request() req,
    @Param('gradeId') gradeId: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return this.teacherService.updateGrade(req.user.sub, gradeId, updateGradeDto);
  }

  @Get('grades/:gradeId')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a specific grade by ID',
    description: 'Retrieve details of a single grade. Only the teacher who assigned the grade can view it.',
  })
  @ApiResponse({
    status: 200,
    description: 'Grade details',
    schema: {
      example: {
        id: 'grade123',
        studentId: 'student456',
        courseId: 'course789',
        teacherId: 'teacher012',
        grade: 4.5,
        createdAt: '2025-12-15T08:05:20.535Z',
        updatedAt: '2025-12-15T08:05:20.535Z',
        student: {
          id: 'student456',
          user: {
            id: 'user123',
            email: 'student@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        course: {
          id: 'course789',
          title: 'Introduction to Web Development',
          code: 'CS101',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the teacher who assigned grade' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  async getGradeById(@Request() req, @Param('gradeId') gradeId: string) {
    return this.teacherService.getGradeById(req.user.sub, gradeId);
  }

  @Delete('grades/:gradeId')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a grade',
    description: 'Remove a grade assignment. Only the teacher who assigned the grade can delete it.',
  })
  @ApiResponse({
    status: 200,
    description: 'Grade deleted successfully',
    schema: {
      example: {
        message: 'Grade deleted successfully',
        id: 'grade123',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the teacher who assigned grade' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  async deleteGrade(@Request() req, @Param('gradeId') gradeId: string) {
    return this.teacherService.deleteGrade(req.user.sub, gradeId);
  }

  @Get('courses/:courseId/grades')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all grades for a course' })
  @ApiResponse({ status: 200, description: 'List of grades' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getGradesByCourse(@Request() req, @Param('courseId') courseId: string) {
    return this.teacherService.getGradesByCourse(req.user.sub, courseId);
  }

  @Get('courses/:courseId/statistics')
  @UseGuards(TeacherAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course statistics (average, min, max grades)' })
  @ApiResponse({ status: 200, description: 'Course statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourseStatistics(@Request() req, @Param('courseId') courseId: string) {
    return this.teacherService.calculateCourseStatistics(courseId);
  }
}

import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { StudentAuthGuard } from '../../guards/student-auth.guard';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('grades')
  @UseGuards(StudentAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all my grades' })
  @ApiResponse({ status: 200, description: 'List of all grades' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student profile not found' })
  async getMyGrades(@Request() req) {
    return this.studentService.getMyGrades(req.user.sub);
  }

  @Get('grades/course/:courseId')
  @UseGuards(StudentAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my grade for a specific course' })
  @ApiResponse({ status: 200, description: 'Grade details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  async getMyGradeByCourse(
    @Request() req,
    @Param('courseId') courseId: string,
  ) {
    return this.studentService.getMyGradesByCourse(req.user.sub, courseId);
  }

  @Get('grades/statistics')
  @UseGuards(StudentAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my grade statistics' })
  @ApiResponse({ status: 200, description: 'Grade statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Student profile not found' })
  async getMyGradeStatistics(@Request() req) {
    return this.studentService.getMyGradeStatistics(req.user.sub);
  }
}

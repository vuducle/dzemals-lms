import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentAuthGuard } from '../../guards/student-auth.guard';
import { CreateEnrollmentDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Enrollments')
@Controller('enrollments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @UseGuards(StudentAuthGuard)
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({
    status: 201,
    description: 'Successfully enrolled in the course.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({
    status: 409,
    description: 'Student is already enrolled in this course',
  })
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto, @Req() req) {
    return this.enrollmentService.create(req.student.id, createEnrollmentDto);
  }
}

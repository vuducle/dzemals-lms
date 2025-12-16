import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentAuthGuard } from '../../guards/student-auth.guard';
import { CreateEnrollmentDto, GetMyEnrollmentsQueryDto } from './dto';
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

  @Get('my')
  @UseGuards(StudentAuthGuard)
  @ApiOperation({
    summary: 'Get my enrollments with optional search/pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of enrollments with course details',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyEnrollments(@Query() query: GetMyEnrollmentsQueryDto, @Req() req) {
    return this.enrollmentService.getMyEnrollments(req.student.id, query);
  }

  @Get(':id')
  @UseGuards(StudentAuthGuard)
  @ApiOperation({ summary: 'Get a specific enrollment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Enrollment with course details',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  async getEnrollmentById(@Param('id') id: string, @Req() req) {
    return this.enrollmentService.getEnrollmentById(id, req.student.id);
  }

  @Delete(':id')
  @UseGuards(StudentAuthGuard)
  @ApiOperation({ summary: 'Withdraw from a course (delete enrollment)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully withdrawn from course',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  async withdrawEnrollment(@Param('id') id: string, @Req() req) {
    return this.enrollmentService.withdrawEnrollment(id, req.student.id);
  }
}

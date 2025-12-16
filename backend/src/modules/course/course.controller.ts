import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCourseDto, GetAllCoursesQueryDto } from './dto';
import { TeacherAuthGuard } from '../../guards/teacher-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(TeacherAuthGuard)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 409,
    description: 'Course with this code already exists',
  })
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req) {
    return this.courseService.create(req.teacher.id, createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    type: GetAllCoursesQueryDto,
    schema: {
      example: {
        id: 'cmj6vcg7t0004u7rb087ccqah',
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of Web Development',
        code: 'CS101',
        teacherId: 'cmj6vcg5r0001u7rbprye5aev',
        startDate: '2025-10-01T00:00:00.000Z',
        endDate: '2026-03-31T00:00:00.000Z',
        room: 'Room 101',
        createdAt: '2025-12-15T08:05:20.535Z',
        updatedAt: '2025-12-15T08:05:20.535Z',
      },
    },
  })
  async getAllCourses(@Query() query: GetAllCoursesQueryDto) {
    return this.courseService.getAllCourses(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get course by code' })
  @ApiResponse({
    status: 200,
    type: GetAllCoursesQueryDto,
    schema: {
      example: {
        id: 'cmj6vcg7t0004u7rb087ccqah',
        title: 'Introduction to Game Engines',
        description: 'Learn the fundamentals of Game Engines',
        code: 'CS101',
        teacherId: 'cmj6vcg5r0001u7rbprye5aev',
        startDate: '2025-10-01T00:00:00.000Z',
        endDate: '2026-03-31T00:00:00.000Z',
        room: 'Room 101',
        createdAt: '2025-12-15T08:05:20.535Z',
        updatedAt: '2025-12-15T08:05:20.535Z',
      },
    },
  })
  async getCourseByCode(@Param('code') code: string) {
    return this.courseService.getCourseByCode(code);
  }
}

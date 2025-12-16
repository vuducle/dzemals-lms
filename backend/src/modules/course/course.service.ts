import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetAllCoursesQueryDto } from './dto';
import { CreateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(teacherId: string, createCourseDto: CreateCourseDto) {
    const { schedule, ...courseData } = createCourseDto;

    const existingCourse = await this.prisma.client.course.findUnique({
      where: {
        code: courseData.code,
      },
    });

    if (existingCourse) {
      throw new ConflictException('Course with this code already exists');
    }

    return this.prisma.client.$transaction(async (prisma) => {
      const course = await prisma.course.create({
        data: {
          ...courseData,
          teacher: {
            connect: {
              id: teacherId,
            },
          },
        },
      });

      if (schedule && schedule.length > 0) {
        await prisma.schedule.createMany({
          data: schedule.map((scheduleItem) => ({
            ...scheduleItem,
            courseId: course.id,
          })),
        });
      }

      return course;
    });
  }

  async getAllCourses(query: GetAllCoursesQueryDto) {
    const { page = 1, limit = 10, search, teacherId } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (teacherId) {
      where.teacherId = teacherId;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [courses, total] = await this.prisma.client.$transaction([
      this.prisma.client.course.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.client.course.count({ where }),
    ]);

    return {
      data: courses,
      total,
      page,
      limit,
    };
  }

  async getCourseByCode(code: string) {
    const course = await this.prisma.client.course.findUnique({
      where: {
        code,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with code ${code} not found`);
    }

    return course;
  }
}

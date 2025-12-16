import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(studentId: string, createEnrollmentDto: CreateEnrollmentDto) {
    const { courseId } = createEnrollmentDto;

    const course = await this.prisma.client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const existingEnrollment = await this.prisma.client.enrollment.findFirst({
      where: {
        studentId,
        courseId,
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('Student is already enrolled in this course');
    }

    return this.prisma.client.enrollment.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
      },
    });
  }
}

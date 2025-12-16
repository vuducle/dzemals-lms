import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto, GetMyEnrollmentsQueryDto } from './dto';

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

  async getMyEnrollments(studentId: string, query: GetMyEnrollmentsQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where: any = { studentId };

    if (search) {
      where.course = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [enrollments, total] = await this.prisma.client.$transaction([
      this.prisma.client.enrollment.findMany({
        where,
        skip,
        take: limit,
        include: { course: true },
      }),
      this.prisma.client.enrollment.count({ where }),
    ]);

    return { data: enrollments, total, page, limit };
  }

  async getEnrollmentById(enrollmentId: string, studentId: string) {
    const enrollment = await this.prisma.client.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true },
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`,
      );
    }

    if (enrollment.studentId !== studentId) {
      throw new ForbiddenException('You do not have access to this enrollment');
    }

    return enrollment;
  }

  async withdrawEnrollment(enrollmentId: string, studentId: string) {
    const enrollment = await this.prisma.client.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`,
      );
    }

    if (enrollment.studentId !== studentId) {
      throw new ForbiddenException('You cannot withdraw from this enrollment');
    }

    return this.prisma.client.$transaction(async (prisma) => {
      // Delete grades for this enrollment
      await prisma.grade.deleteMany({
        where: {
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
        },
      });

      // Delete enrollment
      const deleted = await prisma.enrollment.delete({
        where: { id: enrollmentId },
      });

      return deleted;
    });
  }
}

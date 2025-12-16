import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentByUserId(userId: string) {
    return this.prisma.client.student.findUnique({
      where: { userId },
    });
  }

  async getMyGrades(userId: string) {
    const student = await this.prisma.client.student.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    const grades = await this.prisma.client.grade.findMany({
      where: { studentId: student.id },
      include: {
        course: {
          include: { teacher: { include: { user: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return grades;
  }

  async getMyGradesByCourse(userId: string, courseId: string) {
    const student = await this.prisma.client.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    const grade = await this.prisma.client.grade.findFirst({
      where: { studentId: student.id, courseId },
      include: {
        course: {
          include: { teacher: { include: { user: true } } },
        },
      },
    });

    if (!grade) {
      throw new NotFoundException('Grade not found for this course');
    }

    return grade;
  }

  async getMyGradeStatistics(userId: string) {
    const student = await this.prisma.client.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    const grades = await this.prisma.client.grade.findMany({
      where: { studentId: student.id },
      select: { grade: true },
    });

    if (grades.length === 0) {
      return {
        totalCourses: 0,
        averageGrade: 0,
        highestGrade: 0,
        lowestGrade: 0,
      };
    }

    const gradeValues = grades.map((g) => g.grade);
    const sum = gradeValues.reduce((acc, val) => acc + val, 0);
    const average = parseFloat((sum / gradeValues.length).toFixed(2));
    const highest = Math.max(...gradeValues);
    const lowest = Math.min(...gradeValues);

    return {
      totalCourses: grades.length,
      averageGrade: average,
      highestGrade: highest,
      lowestGrade: lowest,
    };
  }
}

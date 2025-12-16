import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentByUserId(userId: string) {
    return this.prisma.client.student.findUnique({
      where: { userId },
    });
  }
}

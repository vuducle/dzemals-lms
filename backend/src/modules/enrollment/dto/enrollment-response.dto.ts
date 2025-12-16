import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentResponseDto {
  @ApiProperty({
    example: 'clxoyl4d90000u7b4h3f2g1e2',
  })
  id: string;

  @ApiProperty({
    example: 'clxoyl4d90000u7b4h3f2g1e2',
  })
  studentId: string;

  @ApiProperty({
    example: 'clxoyl4d90000u7b4h3f2g1e2',
  })
  courseId: string;

  @ApiProperty({
    example: '2025-12-16T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-12-16T12:00:00.000Z',
  })
  updatedAt: Date;
}

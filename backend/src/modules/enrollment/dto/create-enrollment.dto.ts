
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'The ID of the course to enroll in',
    example: 'clxoyl4d90000u7b4h3f2g1e2',
  })
  @IsString()
  courseId: string;
}

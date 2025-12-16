
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScheduleDto } from './create-schedule.dto';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to TypeScript',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A description of the course',
    example: 'Learn the basics of TypeScript',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The unique code for the course',
    example: 'TS101',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'The start date of the course',
    example: '2025-09-01T09:00:00.000Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the course',
    example: '2025-12-15T17:00:00.000Z',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'The room for the course',
    example: 'Room 101',
    required: false,
  })
  @IsString()
  @IsOptional()
  room?: string;

  @ApiProperty({
    description: 'The schedule for the course',
    type: [CreateScheduleDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  schedule: CreateScheduleDto[];
}

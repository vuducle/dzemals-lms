import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateCourseDto {
  @ApiPropertyOptional({
    description: 'The title of the course',
    example: 'Intro to TS',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'A description of the course',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The start date of the course',
    example: '2025-09-01T09:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'The end date of the course',
    example: '2025-12-15T17:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'The room for the course',
    required: false,
  })
  @IsOptional()
  @IsString()
  room?: string;

  @ApiPropertyOptional({
    description: 'Optional schedule to replace existing schedule',
    type: [CreateScheduleDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  schedule?: CreateScheduleDto[];
}

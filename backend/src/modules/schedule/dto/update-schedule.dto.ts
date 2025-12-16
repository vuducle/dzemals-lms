import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateScheduleDto {
  @ApiProperty({
    description: 'Day of the week (0-6, where 0 is Sunday)',
    example: 1,
    required: false,
  })
  @IsInt()
  @Min(0)
  @Max(6)
  @IsOptional()
  dayOfWeek?: number;

  @ApiProperty({
    description: 'Start time in HH:mm format',
    example: '10:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({
    description: 'End time in HH:mm format',
    example: '12:00',
    required: false,
  })
  @IsString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({
    description: 'Optional: override room for this specific session',
    example: 'A2.1',
    required: false,
  })
  @IsString()
  @IsOptional()
  room?: string;
}

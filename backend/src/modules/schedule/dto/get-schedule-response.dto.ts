import { ApiProperty } from '@nestjs/swagger';

export class GetScheduleResponseDto {
  @ApiProperty({ example: 'cmj6vcg7t0004u7rb087ccqah' })
  id: string;

  @ApiProperty({ example: 'cmj6vcg7t0004u7rb087ccqah' })
  courseId: string;

  @ApiProperty({
    example: 1,
    description: 'Day of week (0=Sunday, 1=Monday, etc.)',
  })
  dayOfWeek: number;

  @ApiProperty({ example: '10:00' })
  startTime: string;

  @ApiProperty({ example: '12:00' })
  endTime: string;

  @ApiProperty({ example: 'Room 101', nullable: true })
  room: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

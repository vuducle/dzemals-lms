import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { GetCourseByCodeDto } from './get-course-by-code.dto';

export class GetAllCoursesResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetCourseByCodeDto)
  data: GetCourseByCodeDto[];

  @IsNumber()
  total: number;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
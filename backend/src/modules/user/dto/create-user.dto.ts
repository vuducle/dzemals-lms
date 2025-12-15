import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'triesnha.ameilya@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Student123!',
    description: 'Password with minimum 8 characters',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Triesnha',
    description: 'User first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Ameilya',
    description: 'User last name',
  })
  @IsString()
  lastName: string;

  // @ApiProperty({
  //   example: 'https://api.example.com/avatars/triesnha-ameilya.jpg',
  //   description: 'User avatar URL',
  //   required: false,
  // })
  // @IsOptional()
  // @IsString()
  // avatarUrl?: string;
}

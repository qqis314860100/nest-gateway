import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty({ example: 123 })
  id?: string;

  @ApiProperty({ example: 'cookie' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '314860100@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'tomtong' })
  @IsNotEmpty()
  username: string;
}

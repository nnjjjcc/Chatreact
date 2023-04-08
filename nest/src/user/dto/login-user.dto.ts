import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: '用户名 or 邮箱必须是字符串奥' })
  @IsNotEmpty({ message: '用户名 or 邮箱不能为空奥' })
  usernameOrEmail: string;

  @IsString({ message: '密码必须是字符串或者数字奥' })
  @IsNotEmpty({ message: '密码不能为空奥' })
  password: string;
}

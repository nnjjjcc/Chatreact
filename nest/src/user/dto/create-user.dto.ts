import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
// 数据验证的管道
export class CreateUserDto {
  @IsString({ message: '用户名必须是字符串奥' })
  @IsNotEmpty({ message: '用户名不能为空奥' })
  username: string;

  @IsEmail({}, { message: '你输入的是邮箱吗' })
  @IsNotEmpty({ message: '邮箱不能为空奥' })
  email: string;

  @IsString({ message: '密码必须是字符串或者数字奥' })
  @IsNotEmpty({ message: '密码不能为空奥' })
  password: string;

  @IsBoolean({ message: '头像的设置与否必须是布尔值奥' })
  @IsNotEmpty({ message: '头像的设置为否不能为空奥' })
  isAvatarImageSet: boolean;

  @IsString({ message: '头像是以字符串形式储存的奥' })
  avatarImage: string;
}

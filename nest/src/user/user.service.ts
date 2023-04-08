import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const exsitingUser = await this.userModel
      .findOne({ username: username })
      .exec();
    const exsitingEmail = await this.userModel.findOne({ email: email }).exec();

    if (exsitingUser) {
      throw new HttpException('用户名已经被占用', 400);
    }
    if (exsitingEmail) {
      throw new HttpException('邮箱已经被占用', 400);
    }
    new this.userModel(createUserDto).save();
    return {
      message: '用户注册成功',
      userData: {
        ...createUserDto,
        password: '保密',
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { usernameOrEmail, password } = loginUserDto;
    const exsitingUser = await this.userModel
      .findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      .exec();

    if (!exsitingUser) {
      throw new HttpException('用户名 or 邮箱 输入错误', 400);
    }
    if (password !== exsitingUser.password) {
      throw new HttpException('密码输入错误', 400);
    }

    return {
      message: '用户登录成功',
      userData: {
        username: exsitingUser.username,
        password: '保密',
        email: exsitingUser.email,
        isAvatarImageSet: exsitingUser.isAvatarImageSet,
        avatarImage: exsitingUser.avatarImage,
      },
    };
  }

  async updateAvatar(username: string, updateUserDto: UpdateUserDto) {
    const exsitingUser =
      updateUserDto.avatarImage &&
      (await this.userModel.findOneAndUpdate(
        {
          username: username,
        },
        { $set: updateUserDto },
        { new: true },
      ));
    if (!exsitingUser) {
      throw new HttpException('头像的设置好像出了一点问题呢', 400);
    }
    return {
      message: '头像设置成功',
      userData: {
        username: exsitingUser.username,
        password: '保密',
        email: exsitingUser.email,
        isAvatarImageSet: exsitingUser.isAvatarImageSet,
        avatarImage: exsitingUser.avatarImage,
      },
    };
  }

  async findAllusers(username: string) {
    const users = await this.userModel
      .find({ username: { $ne: username } })
      .select(['email', 'username', 'avatarImage']);

    if (!users) {
      throw new HttpException('好友的获取貌似出了一点问题呢', 500);
    }
    return {
      message: '好友信息已经成功获取',
      usersData: users,
    };
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: false })
  isAvatarImageSet?: boolean;
  @Prop({ default: '' })
  avatarImage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

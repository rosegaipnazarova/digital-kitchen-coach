import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string; // bcrypt bilan hash qilingan

  @Prop({ type: String, enum: Role, default: Role.STUDENT })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

// passwordni response dan chiqarish
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

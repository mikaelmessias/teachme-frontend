/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import {
  pre, prop, modelOptions, getModelForClass,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../utils/enum';

@pre<User>('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
})
@modelOptions({
  schemaOptions: {
    collection: 'users',
    toJSON: { virtuals: true },
    id: false,
  },
})
export class User {
  @prop({ required: true })
  public name!: string;

  @prop()
  public birthdate!: Date;

  @prop()
  public address!: string;

  @prop()
  public cpf!: number;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public description!: string;

  @prop()
  public avatar!: string;

  @prop({ enum: UserType, type: String, default: 'PADAWAN' })
  public access!: UserType;

  public get avatar_url(): string {
    return `http://localhost:3333/files/avatar/${this.avatar}`;
  };

  public compareHash(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  };
};

const UserModel = getModelForClass(User);

export default UserModel;

/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import {
  pre, prop, modelOptions, DocumentType, getModelForClass,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
class User {
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

  public get avatar_url() {
    return `http://localhost:3333/files/avatar/${this.avatar}`;
  };

  public compareHash(hash: string) {
    return bcrypt.compare(hash, this.password);
  };

  public generateToken(this: DocumentType<User>) {
    return jwt.sign({ id: this._id }, 'secret', {
      expiresIn: '1h',
    });
  };
};

const UserModel = getModelForClass(User);

export default UserModel;

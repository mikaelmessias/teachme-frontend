import {
  getModelForClass, modelOptions, prop, Ref,
} from '@typegoose/typegoose';
import { Day } from '../utils/enum';
import { Skill } from './Skill';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    collection: 'mentors',
    toJSON: { virtuals: true },
    id: false,
  },
})
export class Mentor {
  @prop({ required: true, ref: User, type: String })
  public userId!: Ref<User>;

  @prop({ ref: Skill })
  public skills!: Ref<Skill>[];

  @prop({ required: true, enum: Day, type: String })
  public availableAt!: Day[];
};

const MentorModel = getModelForClass(Mentor);

export default MentorModel;

import {
  prop, Ref, modelOptions, getModelForClass, index,
} from '@typegoose/typegoose';
import { Tech } from './Tech';
import { User } from './User';

@modelOptions({
  schemaOptions: {
    collection: 'skills',
  },
})
@index({ mentorUserId: 1, tech: 1 }, { unique: true })
export class Skill {
  @prop({ ref: Tech, required: true, unique: true })
  public tech!: Ref<Tech>;

  @prop({})
  public price!: number;
};

const SkillModel = getModelForClass(Skill);

export default SkillModel;

import {
  modelOptions, prop, Ref, getModelForClass,
} from '@typegoose/typegoose';
import { Tech } from './Tech';

@modelOptions({})
export class Skill {
  @prop({ ref: 'Tech' })
  public tech!: Ref<Tech>;

  @prop({ required: true })
  public price!: number;
};

const SkillModel = getModelForClass(Skill);

export default SkillModel;

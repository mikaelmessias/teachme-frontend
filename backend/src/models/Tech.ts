/* eslint-disable camelcase */
import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'techs',
    toJSON: { virtuals: true },
    id: false,
  },
})
export class Tech {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop()
  public logo!: string;

  public get logo_url(): string {
    return `http://localhost:3333/files/techLogo/${this.logo}`;
  };
};

const TechModel = getModelForClass(Tech);

export default TechModel;

import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";

const transformDocument = (_: unknown, ret: Record<string, unknown>) => {
  ret.id = ret._id?.toString();
  delete ret._id;
  return ret;
};

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    description: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true, versionKey: false, transform: transformDocument },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformDocument,
    },
  }
);

export type ExperienceInput = InferSchemaType<typeof experienceSchema>;
export type Experience = ExperienceInput & { id: string };
export type ExperienceDocument = HydratedDocument<ExperienceInput>;

const ExperienceModel: Model<ExperienceInput> =
  (models.Experience as Model<ExperienceInput>) ||
  model<ExperienceInput>("Experience", experienceSchema);

export default ExperienceModel;

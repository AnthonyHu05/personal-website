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
  
  const projectSchema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      technologies: { type: [String], required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: false },
      link: { type: String, required: false },
      imageUrl: { type: String, required: false },
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
  
  export type ProjectInput = InferSchemaType<typeof projectSchema>;
  export type Project = ProjectInput & { id: string };
  export type ProjectDocument = HydratedDocument<ProjectInput>;
  
  const ProjectModel: Model<ProjectInput> =
    (models.Project as Model<ProjectInput>) ||
    model<ProjectInput>("Project", projectSchema);
  
  export default ProjectModel;
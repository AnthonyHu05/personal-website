'use server';

import type { HydratedDocument } from "mongoose";

import { connectToDatabase } from "@/lib/mongoose";
import ProjectModel, { Project, ProjectInput } from "@/models/Project";

type ProjectDocument = HydratedDocument<ProjectInput>;

const toProject = (doc: ProjectDocument): Project => doc.toObject<Project>();

export async function getProjects(): Promise<Project[]> {
    await connectToDatabase();
    const projects = await ProjectModel.find().exec();
    return projects.map((project: ProjectDocument) => toProject(project));
}

export async function getProject(id: string): Promise<Project | null> {
    await connectToDatabase();
    const project = await ProjectModel.findById(id).exec();
    return project ? toProject(project) : null;
}

export async function updateProject(
    id: string,
    data: Partial<ProjectInput>,
): Promise<Project | null> {
    await connectToDatabase();
    
    // 过滤掉 undefined 值，但保留 null 和空字符串
    const updateData: Record<string, unknown> = {};
    Object.keys(data).forEach((key) => {
        if (data[key as keyof ProjectInput] !== undefined) {
            updateData[key] = data[key as keyof ProjectInput];
        }
    });
    
    const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true,
        }
    ).exec();
    return updatedProject ? toProject(updatedProject) : null;
}


export async function addProject(newProject: ProjectInput): Promise<Project> {
    await connectToDatabase();
    const createdProject = await ProjectModel.create(newProject);
    return toProject(createdProject);
}

export async function deleteProject(id: string): Promise<boolean> {
    await connectToDatabase();
    const deleted = await ProjectModel.findByIdAndDelete(id).exec();
    return Boolean(deleted);
}
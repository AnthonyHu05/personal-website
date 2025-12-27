'use server';

import type { HydratedDocument } from "mongoose";

import { connectToDatabase } from "@/lib/mongoose";
import ExperienceModel, { Experience, ExperienceInput } from "@/models/Experience";

type ExperienceDocument = HydratedDocument<ExperienceInput>;

const toExperience = (doc: ExperienceDocument): Experience => doc.toObject<Experience>();

export async function getExperiences(): Promise<Experience[]> {
    await connectToDatabase();
    const experiences = await ExperienceModel.find().exec();
    return experiences.map((experience) => toExperience(experience));
}

export async function getExperience(id: string): Promise<Experience | null> {
    await connectToDatabase();
    const experience = await ExperienceModel.findById(id).exec();
    return experience ? toExperience(experience) : null;
}

export async function updateExperience(
    id: string,
    data: Partial<ExperienceInput>,
): Promise<Experience | null> {
    await connectToDatabase();
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).exec();
    return updatedExperience ? toExperience(updatedExperience) : null;
}

export async function addExperience(newExperience: ExperienceInput): Promise<Experience> {
    await connectToDatabase();
    const createdExperience = await ExperienceModel.create(newExperience);
    return toExperience(createdExperience);
}

export async function deleteExperience(id: string): Promise<boolean> {
    await connectToDatabase();
    const deleted = await ExperienceModel.findByIdAndDelete(id).exec();
    return Boolean(deleted);
}
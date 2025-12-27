'use server';

import { NextResponse } from "next/server";
import { z } from "zod";
import { addProject, getProjects } from "@/services/project";

const projectBaseSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    technologies: z.array(z.string()).min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    link: z.string().url().optional().or(z.literal("")),
    imageUrl: z.string().url().optional().or(z.literal("")),
});

const projectCreateSchema = projectBaseSchema;

// GET: Fetch all projects
export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// POST: Add a new project
export async function POST(request: Request) {
    const newProject = projectCreateSchema.parse(await request.json());
    const createdProject = await addProject(newProject);
    return NextResponse.json(createdProject, { status: 201 });
}
'use server';

import { NextResponse } from "next/server";
import { z } from "zod";
import { getProject, updateProject, deleteProject } from "@/services/project";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const projectUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    technologies: z.array(z.string()).min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
    link: z.string().url().optional().or(z.literal("")).nullable(),
    imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
});

// GET: Fetch a single project by ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const parsedId = objectIdSchema.safeParse(params.id);
        if (!parsedId.success) {
            return NextResponse.json(
                { message: parsedId.error.issues[0]?.message ?? "Invalid id" },
                { status: 400 }
            );
        }

        const project = await getProject(parsedId.data);
        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

// PUT: Update a project
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const parsedId = objectIdSchema.safeParse(params.id);
    if (!parsedId.success) {
        return NextResponse.json(
            { message: parsedId.error.issues[0]?.message ?? "Invalid id" },
            { status: 400 }
        );
    }

    const updateData = projectUpdateSchema.parse(await request.json());
    const updatedProject = await updateProject(parsedId.data, updateData);
    
    if (!updatedProject) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProject, { status: 200 });
}

// DELETE: Delete a project
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const parsedId = objectIdSchema.safeParse(params.id);
        if (!parsedId.success) {
            return NextResponse.json(
                { message: parsedId.error.issues[0]?.message ?? "Invalid id" },
                { status: 400 }
            );
        }

        const deleted = await deleteProject(parsedId.data);
        if (!deleted) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Project deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete project" },
            { status: 500 }
        );
    }
}
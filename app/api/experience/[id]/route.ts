'use server';

import { NextResponse } from "next/server";
import { z } from "zod";
import { getExperience, updateExperience, deleteExperience } from "@/services/experience";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const experienceUpdateSchema = z.object({
    company: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
    description: z.string().min(1).optional(),
});

// GET: Fetch a single experience by ID
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

        const experience = await getExperience(parsedId.data);
        if (!experience) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }
        return NextResponse.json(experience, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch experience" },
            { status: 500 }
        );
    }
}

// PUT: Update an experience
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

    const updateData = experienceUpdateSchema.parse(await request.json());
    const updatedExperience = await updateExperience(parsedId.data, updateData);
    
    if (!updatedExperience) {
        return NextResponse.json({ message: "Experience not found" }, { status: 404 });
    }
    return NextResponse.json(updatedExperience, { status: 200 });
}

// DELETE: Delete an experience
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

        const deleted = await deleteExperience(parsedId.data);
        if (!deleted) {
            return NextResponse.json({ message: "Experience not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Experience deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete experience" },
            { status: 500 }
        );
    }
}
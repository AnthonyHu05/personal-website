'use server';

import { NextResponse } from "next/server";
import { z } from "zod";
import { addExperience, getExperiences } from "@/services/experience";

const experienceBaseSchema = z.object({
    company: z.string().min(1),
    title: z.string().min(1),
    location: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    description: z.string().min(1),
});

const experienceCreateSchema = experienceBaseSchema;

// GET: Fetch all experiences
export async function GET() {
    try {
        const experiences = await getExperiences();
        return NextResponse.json(experiences, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch experiences" },
            { status: 500 }
        );
    }
}

// POST: Add a new experience
export async function POST(request: Request) {
    const newExperience = experienceCreateSchema.parse(await request.json());
    const createdExperience = await addExperience(newExperience);
    return NextResponse.json(createdExperience, { status: 201 });
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET avatar based on user ID
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const userFromID = await prisma.users.findUnique({
            where: { id: Number(userId) },
            select: { image: true },
        });
        
        return NextResponse.json(userFromID, { status: 200 });
    } 
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
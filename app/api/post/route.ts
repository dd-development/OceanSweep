import { NextRequest, NextResponse } from "next/server";
import { ContentType, PrismaClient } from "@prisma/client";
import { getUserId } from "@/app/utility/useUser";
import { prisma } from "../../lib/prisma";
import CloudinaryService from "@/app/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const city = formData.get("city") as string;
    const zip = formData.get("zip") as string;
    const statecode = formData.get("statecode") as string;
    const imageFile = formData.get("image") as File | null;
    const userId = Number(await getUserId());

    if (!title || !content || !userId || !zip || !statecode) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await CloudinaryService.uploadImage(buffer);
    }

    // Create content with image
    const newContent = await prisma.content.create({
      data: {
        title: title,
        description: content,
        address: "N/A",
        city: city,
        statecode,
        zip,
        image: imageUrl,
        status: "ACTIVE",
        discardflag: "NO",
        createdby: userId,
        type: ContentType.POST,
      },
    });

    // Create post linked to content
    const newPost = await prisma.post.create({
      data: {
        contentid: newContent.id,
      },
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.content.findMany({
      where: {
        type: "POST", // Assuming 'POST' is the type for posts
      },
      include: {
        post: true,
        users: {
          select: {
            firstname: true,  
            lastname: true,
            image: true,   
          }
        },
      },
      orderBy: {
        createddate: "desc",
      },
    });
    
    const postsWithAuthors = posts.map((post) => ({
      ...post,
      author: post.users ? {
        firstname: post.users.firstname,
        lastname: post.users.lastname,
        image: post.users.image,
      } : null,
    }));

    return NextResponse.json(postsWithAuthors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
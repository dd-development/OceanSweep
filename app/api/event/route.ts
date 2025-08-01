import { NextRequest, NextResponse } from "next/server";
import { ContentType } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import CloudinaryService from "@/app/lib/cloudinary";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { getUserId } from "@/app/utility/useUser";

setKey(`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`); // MAKE SURE TO DEFINE YOUR API KEY IN YOUR .env FILE!!!
setLanguage("en");
setRegion("es");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const city = formData.get("city") as string;
    const stateCode = formData.get("stateCode") as string;
    const zip = formData.get("zip") as string;
    const imageFile = formData.get("image") as File | null;

    const fullAddress = city + ", " + stateCode + ", " + zip; // Concatenate address together
    const geocodeResponse = await fromAddress(fullAddress);
    const latitude = geocodeResponse.results[0].geometry.location.lat;
    const longitude = geocodeResponse.results[0].geometry.location.lng;

    if (!title || !description || !date || !city || !stateCode || !zip) {
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

    const userId = Number(await getUserId());

    // Create content with type EVENT
    const newContent = await prisma.content.create({
      data: {
        title,
        description,
        address: "N/A",
        city,
        statecode: stateCode,
        zip,
        image: imageUrl,
        latitude,
        longitude,
        status: "ACTIVE",
        discardflag: "NO",
        type: ContentType.EVENT,
        createdby:userId,
      },
    });

    // Create event linked to content
    const newEvent = await prisma.events.create({
      data: {
        contentid: newContent.id,
        scheduleddate: new Date(date),
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
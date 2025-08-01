"use client";
import { CldImage } from "next-cloudinary";

type EventImageProps = {
  src: string;
  alt: string;
};

export default function EventImage({ src, alt }: EventImageProps) {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <CldImage
        src={src}
        alt={alt}
        width={500}
        height={200}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
  );
}

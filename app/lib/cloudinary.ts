import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export default class CloudinaryService {
  static async uploadImage(buffer: Buffer, folder: string = "events"): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(null);
          } else {
            resolve(result?.secure_url || null);
          }
        }
      );

      uploadStream.end(buffer);
    });
  }
}
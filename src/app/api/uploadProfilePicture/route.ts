import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Get the profile picture file
    const file = formData.get("file") as File | null;
    const userId = 
      formData.get("userId")?.toString() || "unknown_user";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    // if (!["image/png", "image/jpeg"].includes(file.type)) {
    //   return NextResponse.json(
    //     { error: "Only PNG and JPEG files are allowed" },
    //     { status: 400 }
    //   );
    // }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `profilePictures/${userId}`, // Organized under profilePictures with userId subfolder
            resource_type: "image",
            // allowed_formats: ["png", "jpeg"],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const { secure_url, public_id } = result as any;

    return NextResponse.json({
      success: true,
      image: { url: secure_url, publicId: public_id },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
    
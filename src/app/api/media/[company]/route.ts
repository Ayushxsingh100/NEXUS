import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ company: string }> | { company: string } }
) {
  try {
    // Await params to support modern Next.js APIs where params is a Promise
    const resolvedParams = await context.params;
    const company = resolvedParams.company;

    // Sanitize the input to prevent path traversal vulnerability
    if (!company || !/^[a-zA-Z0-9_-]+$/.test(company)) {
      return NextResponse.json(
        { error: "Invalid company parameter" },
        { status: 400 }
      );
    }

    const dirPath = path.join(process.cwd(), "public", "media", "experience", company);

    if (!fs.existsSync(dirPath)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(dirPath);
    
    // Sort files to keep consistent order (e.g. alphabetical)
    files.sort();

    // Filter for typical web-compatible image extensions
    const images = files
      .filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
      .map((file) => `/media/experience/${company}/${file}`);

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error reading experience media directory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

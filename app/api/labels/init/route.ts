import { NextRequest, NextResponse } from "next/server";
import { defaultLabelColors } from "@/constants/default-label-colors";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    console.log("hello");
    const transaction = defaultLabelColors.map((label) =>
      db.label.create({
        data: {
          title: "",
          color: label.value,
        },
      })
    );

    await db.$transaction(transaction);

    return new NextResponse("Labels created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating labels:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

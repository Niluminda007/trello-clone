import { NextRequest, NextResponse } from "next/server";
import { defaultLabelColors } from "@/constants/default-label-colors";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const labels = await db.label.findMany({});
    if (!(labels.length > 0)) {
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
    }
    return new NextResponse("Labels are already  initialized", { status: 200 });
  } catch (error) {
    console.error("Error creating labels:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

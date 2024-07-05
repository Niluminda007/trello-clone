import { PrismaClient } from "@prisma/client";
import { defaultLabelColors } from "./data.mjs";

const prisma = new PrismaClient();

const load = async () => {
  try {
    // seed labels
    const labels = await prisma.label.findMany({});
    if (labels.length === 0) {
      const transaction = defaultLabelColors.map((label) =>
        prisma.label.create({
          data: {
            title: "",
            color: label.value,
          },
        })
      );

      await prisma.$transaction(transaction);
      console.log("Labels created successfully");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

load();

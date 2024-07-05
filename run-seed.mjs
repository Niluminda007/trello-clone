import { execSync } from "child_process";
execSync("node prisma/seed/index.mjs", { stdio: "inherit" });

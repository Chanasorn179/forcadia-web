import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma CLI operations (migrations, Studio and seed) need a session/direct
// connection. The application itself keeps using the pooled DATABASE_URL.
const databaseUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});

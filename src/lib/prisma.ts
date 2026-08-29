import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  // Keep public routes alive when a deployment has not been connected to its
  // database yet. Queries will fail normally and public-content will serve the
  // bundled read-only fallback instead.
  const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured";

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

CREATE TABLE "AdminLoginAttempt" (
    "fingerprint" TEXT NOT NULL,
    "failures" INTEGER NOT NULL DEFAULT 0,
    "blockedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminLoginAttempt_pkey" PRIMARY KEY ("fingerprint")
);

CREATE INDEX "AdminLoginAttempt_updatedAt_idx" ON "AdminLoginAttempt"("updatedAt");

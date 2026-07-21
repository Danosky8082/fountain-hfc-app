-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DRAFT', 'FINALIZED');

-- CreateTable
CREATE TABLE "MonthlyReport" (
    "id" TEXT NOT NULL,
    "fellowshipId" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,
    "week1Date" TIMESTAMP(3),
    "week2Date" TIMESTAMP(3),
    "week3Date" TIMESTAMP(3),
    "week4Date" TIMESTAMP(3),
    "week5Date" TIMESTAMP(3),
    "week1Count" INTEGER NOT NULL DEFAULT 0,
    "week2Count" INTEGER NOT NULL DEFAULT 0,
    "week3Count" INTEGER NOT NULL DEFAULT 0,
    "week4Count" INTEGER NOT NULL DEFAULT 0,
    "week5Count" INTEGER NOT NULL DEFAULT 0,
    "prayerFlag" BOOLEAN NOT NULL DEFAULT false,
    "firstTimers" INTEGER NOT NULL DEFAULT 0,
    "newMembers" INTEGER NOT NULL DEFAULT 0,
    "followUps" INTEGER NOT NULL DEFAULT 0,
    "escalations" TEXT,
    "comments" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'DRAFT',
    "finalizedAt" TIMESTAMP(3),
    "finalizedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyReport_fellowshipId_monthYear_key" ON "MonthlyReport"("fellowshipId", "monthYear");

-- AddForeignKey
ALTER TABLE "MonthlyReport" ADD CONSTRAINT "MonthlyReport_fellowshipId_fkey" FOREIGN KEY ("fellowshipId") REFERENCES "Fellowship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

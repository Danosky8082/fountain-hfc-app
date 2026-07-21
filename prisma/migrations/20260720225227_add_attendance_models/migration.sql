-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_fellowshipId_fkey";

-- DropIndex
DROP INDEX "Fellowship_name_key";

-- DropIndex
DROP INDEX "Member_email_key";

-- CreateTable
CREATE TABLE "AttendanceSession" (
    "id" TEXT NOT NULL,
    "fellowshipId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "monthYear" TEXT NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "submittedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "checkInMethod" TEXT NOT NULL,
    "checkedInBy" TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceSession_fellowshipId_weekNumber_monthYear_key" ON "AttendanceSession"("fellowshipId", "weekNumber", "monthYear");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_sessionId_memberId_key" ON "AttendanceRecord"("sessionId", "memberId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_fellowshipId_fkey" FOREIGN KEY ("fellowshipId") REFERENCES "Fellowship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceSession" ADD CONSTRAINT "AttendanceSession_fellowshipId_fkey" FOREIGN KEY ("fellowshipId") REFERENCES "Fellowship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceSession" ADD CONSTRAINT "AttendanceSession_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AttendanceSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

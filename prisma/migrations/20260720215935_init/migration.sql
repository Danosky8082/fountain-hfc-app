-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FL', 'ASSOCIATE', 'HOD', 'ADMIN');

-- CreateTable
CREATE TABLE "Fellowship" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "leaderId" TEXT,
    "associateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fellowship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "churchId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "qrUniqueId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "fellowshipId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fellowship_name_key" ON "Fellowship"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fellowship_leaderId_key" ON "Fellowship"("leaderId");

-- CreateIndex
CREATE UNIQUE INDEX "Fellowship_associateId_key" ON "Fellowship"("associateId");

-- CreateIndex
CREATE UNIQUE INDEX "User_churchId_key" ON "User"("churchId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_qrUniqueId_key" ON "Member"("qrUniqueId");

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_fellowshipId_fkey" FOREIGN KEY ("fellowshipId") REFERENCES "Fellowship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

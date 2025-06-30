-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleUser_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleUser" DROP NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleUser_fkey" FOREIGN KEY ("roleUser") REFERENCES "Permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

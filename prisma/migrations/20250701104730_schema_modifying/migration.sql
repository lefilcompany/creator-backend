/*
  Warnings:

  - A unique constraint covering the columns `[permission]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roleUser` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleUser_fkey";

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleUser" SET NOT NULL,
ALTER COLUMN "roleUser" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Permission_permission_key" ON "Permission"("permission");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_value_key" ON "Permission"("value");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleUser_fkey" FOREIGN KEY ("roleUser") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

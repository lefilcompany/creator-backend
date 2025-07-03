/*
  Warnings:

  - You are about to drop the column `roleUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rolePermission` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleUser_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleUser",
ADD COLUMN     "rolePermission" TEXT NOT NULL,
ADD COLUMN     "roleValue" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Permission";

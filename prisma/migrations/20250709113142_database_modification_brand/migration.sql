/*
  Warnings:

  - You are about to drop the column `consumeHabit` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `hobbies` on the `Persona` table. All the data in the column will be lost.
  - Added the required column `brandCrisis` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandHashtags` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandInspiration` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandManual` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandMission` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandPillars` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentObjective` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importantDates` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `influencersAction` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numericTarget` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceContents` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relevantContent` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restrictions` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueProposition` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `beliefs` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyJourney` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentHabit` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favoriteVoice` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestTrigger` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainObjective` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `Persona` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "brandCrisis" TEXT NOT NULL,
ADD COLUMN     "brandHashtags" TEXT NOT NULL,
ADD COLUMN     "brandInspiration" TEXT NOT NULL,
ADD COLUMN     "brandManual" INTEGER NOT NULL,
ADD COLUMN     "brandMission" TEXT NOT NULL,
ADD COLUMN     "brandPillars" TEXT NOT NULL,
ADD COLUMN     "currentObjective" TEXT NOT NULL,
ADD COLUMN     "importantDates" TEXT NOT NULL,
ADD COLUMN     "influencersAction" INTEGER NOT NULL,
ADD COLUMN     "numericTarget" TEXT NOT NULL,
ADD COLUMN     "referenceContents" TEXT NOT NULL,
ADD COLUMN     "relevantContent" TEXT NOT NULL,
ADD COLUMN     "restrictions" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "valueProposition" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "consumeHabit",
DROP COLUMN "goals",
DROP COLUMN "hobbies",
ADD COLUMN     "beliefs" TEXT NOT NULL,
ADD COLUMN     "buyJourney" TEXT NOT NULL,
ADD COLUMN     "contentHabit" TEXT NOT NULL,
ADD COLUMN     "favoriteVoice" TEXT NOT NULL,
ADD COLUMN     "interestTrigger" TEXT NOT NULL,
ADD COLUMN     "mainObjective" TEXT NOT NULL,
ALTER COLUMN "positionDegree" SET DATA TYPE TEXT,
ALTER COLUMN "challenge" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

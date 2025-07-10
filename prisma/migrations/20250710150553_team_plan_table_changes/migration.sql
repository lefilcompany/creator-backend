/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `TeamPlan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[planId]` on the table `TeamPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeamPlan_teamId_key" ON "TeamPlan"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamPlan_planId_key" ON "TeamPlan"("planId");

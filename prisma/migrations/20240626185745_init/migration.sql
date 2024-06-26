/*
  Warnings:

  - A unique constraint covering the columns `[predictionID]` on the table `Predictions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Predictions_predictionID_key" ON "Predictions"("predictionID");

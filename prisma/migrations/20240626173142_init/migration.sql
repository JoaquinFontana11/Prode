/*
  Warnings:

  - Made the column `local` on table `Results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visitor` on table `Results` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "local" SET NOT NULL,
ALTER COLUMN "visitor" SET NOT NULL;

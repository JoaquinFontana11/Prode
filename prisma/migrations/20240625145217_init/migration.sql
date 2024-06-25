/*
  Warnings:

  - You are about to drop the column `fullname` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "fullname",
ADD COLUMN     "username" VARCHAR NOT NULL DEFAULT 'admin';

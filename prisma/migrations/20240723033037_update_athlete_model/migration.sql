/*
  Warnings:

  - Added the required column `position` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shirtNmber` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "shirtNmber" INTEGER NOT NULL;

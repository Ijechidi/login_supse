/*
  Warnings:

  - Made the column `dateDebut` on table `rendez_vous` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rendez_vous" ALTER COLUMN "dateDebut" SET NOT NULL;

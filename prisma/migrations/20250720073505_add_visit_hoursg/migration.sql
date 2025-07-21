/*
  Warnings:

  - Added the required column `dateDebut` to the `rendez_vous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rendez_vous" ADD COLUMN     "dateDebut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateFin" TIMESTAMP(3);

/*
  Warnings:

  - You are about to drop the column `dateDebut` on the `rendez_vous` table. All the data in the column will be lost.
  - You are about to drop the column `dateFin` on the `rendez_vous` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rendez_vous" DROP COLUMN "dateDebut",
DROP COLUMN "dateFin";

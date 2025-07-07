/*
  Warnings:

  - You are about to drop the column `date` on the `rendez_vous` table. All the data in the column will be lost.
  - You are about to drop the column `heure` on the `rendez_vous` table. All the data in the column will be lost.
  - Added the required column `dateDebut` to the `rendez_vous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rendez_vous" DROP COLUMN "date",
DROP COLUMN "heure",
ADD COLUMN     "dateDebut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateFin" TIMESTAMP(3);

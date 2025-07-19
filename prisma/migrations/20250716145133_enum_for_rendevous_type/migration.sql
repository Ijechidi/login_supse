/*
  Warnings:

  - You are about to drop the column `type_id` on the `rendez_vous` table. All the data in the column will be lost.
  - You are about to drop the `TypeRendezVous` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `rendez_vous` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeRendezVousEnum" AS ENUM ('CONSULTATION', 'SUIVI', 'URGENCE', 'TELECONSULTATION');

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_type_id_fkey";

-- AlterTable
ALTER TABLE "rendez_vous" DROP COLUMN "type_id",
ADD COLUMN     "type" "TypeRendezVousEnum" NOT NULL;

-- DropTable
DROP TABLE "TypeRendezVous";

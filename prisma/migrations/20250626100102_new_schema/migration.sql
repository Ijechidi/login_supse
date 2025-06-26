/*
  Warnings:

  - You are about to drop the column `created_at` on the `disponibilites` table. All the data in the column will be lost.
  - You are about to drop the column `heure_debut` on the `disponibilites` table. All the data in the column will be lost.
  - You are about to drop the column `heure_fin` on the `disponibilites` table. All the data in the column will be lost.
  - You are about to drop the column `jour_semaine` on the `disponibilites` table. All the data in the column will be lost.
  - You are about to drop the `patients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `heureDebut` to the `disponibilites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heureFin` to the `disponibilites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jour` to the `disponibilites` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'MEDECIN', 'ADMIN', 'SECRETAIRE');

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_patient_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "meta" JSONB,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PATIENT';

-- AlterTable
ALTER TABLE "disponibilites" DROP COLUMN "created_at",
DROP COLUMN "heure_debut",
DROP COLUMN "heure_fin",
DROP COLUMN "jour_semaine",
ADD COLUMN     "heureDebut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "heureFin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jour" TEXT NOT NULL,
ADD COLUMN     "meta" JSONB;

-- AlterTable
ALTER TABLE "medecins" ADD COLUMN     "description" TEXT,
ADD COLUMN     "indisponibilites" JSONB,
ADD COLUMN     "meta" JSONB;

-- AlterTable
ALTER TABLE "rendez_vous" ADD COLUMN     "historique" JSONB,
ADD COLUMN     "meta" JSONB;

-- DropTable
DROP TABLE "patients";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

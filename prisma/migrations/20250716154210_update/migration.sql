/*
  Warnings:

  - The primary key for the `medecins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_user_id_fkey";

-- DropForeignKey
ALTER TABLE "disponibilites" DROP CONSTRAINT "disponibilites_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous" DROP CONSTRAINT "rendez_vous_patient_id_fkey";

-- DropIndex
DROP INDEX "medecins_user_id_key";

-- AlterTable
ALTER TABLE "medecins" DROP CONSTRAINT "medecins_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "medecins_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Patient";

-- CreateTable
CREATE TABLE "patients" (
    "user_id" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "medecins"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilites" ADD CONSTRAINT "disponibilites_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "medecins"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

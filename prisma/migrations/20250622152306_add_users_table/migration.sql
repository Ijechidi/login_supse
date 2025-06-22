/*
  Warnings:

  - You are about to drop the column `adresse` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `dateNaissance` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `medecins` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `dateNaissance` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `medecins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "medecins" DROP COLUMN "adresse",
DROP COLUMN "created_at",
DROP COLUMN "dateNaissance",
DROP COLUMN "nom",
DROP COLUMN "prenom",
DROP COLUMN "telephone";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "adresse",
DROP COLUMN "created_at",
DROP COLUMN "dateNaissance",
DROP COLUMN "nom",
DROP COLUMN "prenom",
DROP COLUMN "telephone";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "adresse" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "medecins_user_id_key" ON "medecins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medecins" ADD CONSTRAINT "medecins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

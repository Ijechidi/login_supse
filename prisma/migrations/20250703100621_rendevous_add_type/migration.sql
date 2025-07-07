/*
  Warnings:

  - Added the required column `type_id` to the `rendez_vous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rendez_vous" ADD COLUMN     "type_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TypeRendezVous" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "couleur" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypeRendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeRendezVous_nom_key" ON "TypeRendezVous"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "TypeRendezVous_code_key" ON "TypeRendezVous"("code");

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeRendezVous"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

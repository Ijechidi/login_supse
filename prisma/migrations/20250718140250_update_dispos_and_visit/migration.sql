/*
  Warnings:

  - A unique constraint covering the columns `[disponibilite_id]` on the table `rendez_vous` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `disponibilite_id` to the `rendez_vous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rendez_vous" ADD COLUMN     "disponibilite_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "rendez_vous_disponibilite_id_key" ON "rendez_vous"("disponibilite_id");

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_disponibilite_id_fkey" FOREIGN KEY ("disponibilite_id") REFERENCES "disponibilites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

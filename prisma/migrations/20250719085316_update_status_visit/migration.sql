/*
  Warnings:

  - The values [en_attente,confirme,annule,termine] on the enum `Statut` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Statut_new" AS ENUM ('EN_ATTENTE', 'CONFIRME', 'ANNULE', 'TERMINE');
ALTER TABLE "rendez_vous" ALTER COLUMN "statut" DROP DEFAULT;
ALTER TABLE "rendez_vous" ALTER COLUMN "statut" TYPE "Statut_new" USING ("statut"::text::"Statut_new");
ALTER TYPE "Statut" RENAME TO "Statut_old";
ALTER TYPE "Statut_new" RENAME TO "Statut";
DROP TYPE "Statut_old";
ALTER TABLE "rendez_vous" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';
COMMIT;

-- AlterTable
ALTER TABLE "rendez_vous" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';

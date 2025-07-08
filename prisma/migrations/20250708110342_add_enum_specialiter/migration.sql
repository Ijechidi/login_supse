/*
  Warnings:

  - Changed the type of `specialite` on the `medecins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Specialite" AS ENUM ('MEDECINE_GENERALE', 'CARDIOLOGIE', 'DERMATOLOGIE', 'PEDIATRIE', 'GYNECOLOGIE', 'NEUROLOGIE', 'OPHTALMOLOGIE', 'ORTHOPEDIE');

-- AlterTable
ALTER TABLE "medecins" DROP COLUMN "specialite",
ADD COLUMN     "specialite" "Specialite" NOT NULL;

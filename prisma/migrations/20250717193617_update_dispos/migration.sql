/*
  Warnings:

  - Added the required column `status` to the `disponibilites` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DisponibiliteStatus" AS ENUM ('LIBRE', 'RESERVE', 'ANNULE');

-- AlterTable
ALTER TABLE "disponibilites" ADD COLUMN     "status" "DisponibiliteStatus" NOT NULL;

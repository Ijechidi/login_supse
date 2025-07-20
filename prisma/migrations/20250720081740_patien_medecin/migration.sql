-- CreateTable
CREATE TABLE "patients_medecins" (
    "patientId" TEXT NOT NULL,
    "medecinId" TEXT NOT NULL,
    "suiviDepuis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" JSONB,

    CONSTRAINT "patients_medecins_pkey" PRIMARY KEY ("patientId","medecinId")
);

-- AddForeignKey
ALTER TABLE "patients_medecins" ADD CONSTRAINT "patients_medecins_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients_medecins" ADD CONSTRAINT "patients_medecins_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "medecins"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

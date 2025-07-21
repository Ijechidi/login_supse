"use server"
import { NextResponse } from "next/server";
import { getSpecialitesWithMedecins } from "@/lib/medecin/getSpecialitesWithMedecins";

export async function GET() {
  const specialites = await getSpecialitesWithMedecins();
  return NextResponse.json(specialites);
} 
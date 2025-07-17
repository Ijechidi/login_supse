"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    const userId = authUser.id;
    const email = authUser.email;
    const role = authUser.user_metadata?.role || "PATIENT";
    const avatar_url = authUser.user_metadata?.avatar_url;

    const { nom, prenom, telephone, dateNaissance, adresse, avatarUrl, specialite } = await req.json();

    if (!userId || !nom || !prenom || !telephone || !dateNaissance || !adresse || !email) {
        return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }
    if (role === "MEDECIN" && !specialite) {
        return NextResponse.json({ error: "La spécialité est requise pour un médecin" }, { status: 400 });
    }

    // Vérifie s'il existe déjà un utilisateur avec cet email, mais un id différent
const existing = await prisma.user.findUnique({ where: { email } });

if (existing && existing.id !== userId) {
  return NextResponse.json({
    error: "Cet email est déjà utilisé par un autre compte.",
  }, { status: 400 });
}

    try {
        // Crée ou met à jour l'utilisateur
        const user = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email,
                nom,
                prenom,
                telephone,
                dateNaissance: new Date(dateNaissance),
                adresse,
                avatarUrl: avatarUrl || avatar_url || undefined,
            },
            create: {
                id: userId,
                email,
                nom,
                prenom,
                telephone,
                dateNaissance: new Date(dateNaissance),
                adresse,
                avatarUrl: avatarUrl || avatar_url || undefined,
            },
        });

        if (role === "PATIENT") {
            await prisma.patient.upsert({
                where: { id:userId },
                update: {},
                create: { id:userId },
            });
        } else if (role === "MEDECIN") {
            await prisma.medecin.upsert({
                where: { id:userId },
                update: { specialite },
                create: { id:userId, specialite },
            });
        }

        // Met à jour le profil Supabase
        await supabase.auth.updateUser({
            data: {
                name: `${user.prenom} ${user.nom}`,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                phone: user.telephone,
                date_naissance: user.dateNaissance,
                adresse: user.adresse,
                completedProfile: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Erreur lors de l'upsert Prisma :", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

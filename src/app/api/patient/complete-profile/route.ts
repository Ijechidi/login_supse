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
    const { nom, prenom, telephone, dateNaissance, adresse, avatarUrl } = await req.json();

    if (!userId || !nom || !prenom || !telephone || !dateNaissance || !adresse || !email) {
        return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
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
                avatarUrl: avatarUrl || undefined,
            },
            create: {
                id: userId,
                email,
                nom,
                prenom,
                telephone,
                dateNaissance: new Date(dateNaissance),
                adresse,
                avatarUrl: avatarUrl || undefined,
            },
        });

        // Crée le profil patient seulement s'il n'existe pas (grâce à upsert)
        await prisma.patient.upsert({
            where: { userId }, // ⚠️ Assure-toi que userId est une clé unique dans le modèle `patient`
            update: {}, // rien à mettre à jour ici
            create: { userId },
        });

        // Met à jour le profil Supabase
        await supabase.auth.updateUser({
            data: {
                name: `${user.prenom} ${user.nom}`,
                email: user.email,
                phone: user.telephone,
                date_naissance: user.dateNaissance,
                adresse: user.adresse,
                role: "patient",
                is_complete_profile: true,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Erreur lors de l'upsert Prisma :", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

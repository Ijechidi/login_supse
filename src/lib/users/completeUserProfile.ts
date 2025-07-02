"use server"
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { UserInfo } from "@/types/userInfo";

export async function updateUserMetadata({
  userId,
  data,
}: {
  userId: string;
  data: Partial<UserInfo>;
}) {
  const supabase = await createClient();
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...data,
      completedProfile: true,
    },
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function updateUserPrisma({
  userId,
  data,
  role = "PATIENT"
}: {
  userId: string;
  data: Partial<UserInfo>;
  role?: "PATIENT" | "MEDECIN";
}) {
  try {
    if (role === "PATIENT") {
      await prisma.patient.updateMany({
        where: { userId },
        data: {
          meta: {
            ...data,
            completedProfile: true,
          },
        },
      });
    } else if (role === "MEDECIN") {
      await prisma.medecin.updateMany({
        where: { userId },
        data: {
          meta: {
            ...data,
            completedProfile: true,
          },
        },
      });
    }
    return { error: null };
  } catch (e: any) {
    return { error: e.message };
  }
} 
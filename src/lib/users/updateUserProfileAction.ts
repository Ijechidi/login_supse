"use server";
import { updateUserMetadata, updateUserPrisma } from "@/lib/users/completeUserProfile";
import { getAuthUser } from "@/utils/getUser";
import { revalidatePath } from "next/cache";



export async function updateUserProfileAction(formData: FormData) {

  const user = await getAuthUser();
  const authUserId = user?.id;
  if (!authUserId) throw new Error("Utilisateur non authentifié");
  const userId = authUserId;
  const nom = formData.get("nom") as string;
  const prenom = formData.get("prenom") as string;
  const email = formData.get("email") as string;
  const telephone = formData.get("telephone") as string;
  const dateNaissance = formData.get("dateNaissance") as string;
  const adresse = formData.get("adresse") as string;
  const bio = formData.get("bio") as string;
  // Ajouter d'autres champs si besoin

  const data = { nom, prenom, email, telephone, dateNaissance, adresse, bio };

  await updateUserMetadata({ data });
  await updateUserPrisma({ userId, data });
  revalidatePath("/profile");
  // Ne rien retourner
} 
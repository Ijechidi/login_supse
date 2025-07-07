"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useAvatarUploader() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const uploadAvatar = async (file: File) => {
    if (!file) return;

    // Validation du fichier
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "Max 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "PNG ou JPEG uniquement",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Utilisateur non authentifié");
      }

      // Récupérer l’extension à partir du type MIME
      const extension = file.type.split("/")[1]; // "png" ou "jpeg"
      const filePath = `${user.id}/avatar.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Erreur lors de l’upload :", uploadError);
        throw uploadError;
      }

      // URL publique
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatar_url = publicUrlData.publicUrl;
      setAvatarUrl(avatar_url);

      // Mise à jour des métadonnées Supabase
      const { error: userError } = await supabase.auth.updateUser({
        data: { avatar_url },
      });

      if (userError) {
        console.error("Erreur mise à jour metadata Supabase :", userError);
        throw new Error(userError.message);
      }

      toast({
        title: "Succès",
        description: "Votre photo de profil a été mise à jour.",
      });

      return avatar_url;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Échec du téléversement",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    avatarUrl,
    uploading,
    uploadAvatar,
    setAvatarUrl, // utile pour modifier manuellement si besoin
  };
}

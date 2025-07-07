"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAvatarUploader } from "@/hooks/useAvatarUploader";

export default function AvatarUploader() {
  const { avatarUrl, uploading, uploadAvatar, setAvatarUrl } = useAvatarUploader();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  // Charger l'avatar actuel au montage
  useEffect(() => {
    const fetchAvatar = async () => {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata?.avatar_url) {
        setUserAvatar(user.user_metadata.avatar_url);
      }
    };
    fetchAvatar();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };


const rawAvatarUrl = avatarUrl || userAvatar;
const displayedAvatar = rawAvatarUrl ? `${rawAvatarUrl}?t=${Date.now()}` : null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={() => document.getElementById("avatar-input")?.click()}
        className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-[#1cb0ff] transition-all hover:border-[#3dcaff]"
      >
        {displayedAvatar ? (
          <Image
            src={displayedAvatar}
            alt="Avatar"
            fill
            className="rounded-full object-cover transition-opacity group-hover:opacity-50"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
            Photo
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs text-transparent transition-all group-hover:bg-black/30 group-hover:text-white">
          Modifier
        </div>
      </div>
      <input
        id="avatar-input"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
        title="Choisir une photo de profil"
      />

      {uploading && (
        <p className="text-xs text-gray-400">Téléversement en cours...</p>
      )}
    </div>
  );
}

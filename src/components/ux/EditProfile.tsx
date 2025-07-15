"use client";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ImagePlus, X } from "lucide-react";
import { useId, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import AvatarUploader from "@/components/user/AvatarUploader";
import { updateUserProfileAction } from "@/lib/users/updateUserProfileAction";
import { Role } from "@/types/types";

export interface User {
  id: string;
  email: string | null;
  nom: string | null;
  prenom: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  role: Role | string;
  fonction?: string | null;
  prisma_user_id?: string | null;
  telephone?: string | null;
  dateNaissance?: string | null;
  adresse?: string | null;
  sexe?: string | null;
  completedProfile?: boolean;
  next_visit?: string | null;
  last_visit?: string | null;
  age?: number;
  meta?: any;
  createdAt?: Date;
}

interface EditProfileProps {
  onProfileUpdate?: (updatedUser: Partial<User>) => void;
}

function EditProfile({ onProfileUpdate }: EditProfileProps) {
  const { toast } = useToast();
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const { user: profile, loading, fetchUser } = useUserProfile();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    adresse: '',
  });

  // Remplir le formulaire avec les données du profil dès qu'elles sont chargées
  useEffect(() => {
    if (!profile && !loading) fetchUser();
    if (profile) {
      setFormData({
        prenom: profile.prenom || '',
        nom: profile.nom || '',
        email: profile.email || '',
        telephone: profile.telephone || '',
        dateNaissance: profile.dateNaissance ? (typeof profile.dateNaissance === 'string' ? profile.dateNaissance.split('T')[0] : new Date(profile.dateNaissance).toISOString().split('T')[0]) : '',
        adresse: profile.adresse || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, loading]);

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: `${profile?.prenom || ''} ${profile?.nom || ''}`.trim(),
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Vérification de l'âge minimum
    const age = calculateAge(formData.dateNaissance);
    if (age === null || age < 18) {
      toast({
        title: "Âge minimum requis",
        description: "Vous devez avoir au moins 18 ans pour utiliser cette application.",
       
      });
      return;
    }
    // On garde la date au format string (YYYY-MM-DD)
    const updatedData = {
      ...formData,
      dateNaissance: formData.dateNaissance,
    };

    try {
      const formDataToSubmit = new FormData();
      if (!profile || !profile.id) return;
      formDataToSubmit.append('userId', profile.id );
      Object.entries(updatedData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value === null || value === undefined ? '' : String(value));
      });

      await updateUserProfileAction(formDataToSubmit);
      if (onProfileUpdate) {
        onProfileUpdate(updatedData);
      }
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du profil. Veuillez réessayer.",    
      });
    }
  };

  // Calculer l'âge
  const calculateAge = (birthDate: string | Date | null | undefined): number | null => {
    if (!birthDate) return null;
    const dateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    if (isNaN(dateObj.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDifference = today.getMonth() - dateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateObj.getDate())) {
      age--;
    }
    return age;
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center py-8">
        <span>Chargement du profil...</span>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline">Modifier le profil</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            {/* Modifier le profil */}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Modifiez vos informations de profil ici. Vous pouvez changer votre photo et vos informations personnelles.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg defaultImage={profile.avatarUrl || undefined} />
          <div className="-mt-10 px-6">
            <AvatarUploader  />
          </div>
          <div className="px-6 pb-2 pt-2">
            <form className="space-y-1" onSubmit={handleSubmit}>
              <input type="hidden" name="userId" value={profile.id!} />
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>Prénom</Label>
                  <Input
                    id={`${id}-first-name`}
                    name="prenom"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Nom</Label>
                  <Input
                    id={`${id}-last-name`}
                    name="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input
                  id={`${id}-email`}
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-telephone`}>Téléphone</Label>
                <Input
                  id={`${id}-telephone`}
                  name="telephone"
                  placeholder="0600000000"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-dateNaissance`}>Date de naissance</Label>
                <Input
                  id={`${id}-dateNaissance`}
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                  type="date"
               
                />
                {formData.dateNaissance && calculateAge(formData.dateNaissance) !== null && (
                  <p className="text-sm text-muted-foreground">
                    Âge: {calculateAge(formData.dateNaissance)} ans
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-adresse`}>Adresse</Label>
                <Input
                  id={`${id}-adresse`}
                  name="adresse"
                  placeholder="Votre adresse"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange('adresse', e.target.value)}
                  type="text"
                />
              </div>
              <DialogFooter className="border-t border-border px-0 py-4 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="submit" className="flex items-center gap-2">
                  <Check size={16} />
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
    useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt={previewUrl ? "Aperçu de l'image téléchargée" : "Image de profil par défaut"}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Changer l'image" : "Télécharger une image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
              onClick={handleImageRemove}
              aria-label="Supprimer l'image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Télécharger un fichier image"
      />
    </div>
  );
}

// Composant pour afficher les informations utilisateur en lecture seule
function UserProfile({ user }: { user: User }) {
  const calculateAge = (birthDate: string | Date | null | undefined): number | null => {
    if (!birthDate) return null;
    const dateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    if (isNaN(dateObj.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDifference = today.getMonth() - dateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateObj.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={`Avatar de ${user.prenom} ${user.nom}`}
            className="h-16 w-16 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.prenom} {user.nom}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Téléphone</Label>
          <p className="text-sm text-muted-foreground">{user.telephone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Âge</Label>
          <p className="text-sm text-muted-foreground">
            {user.dateNaissance && calculateAge(user.dateNaissance) !== null ? `${calculateAge(user.dateNaissance)} ans` : 'Non renseigné'}
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium">Date de naissance</Label>
          <p className="text-sm text-muted-foreground">
            {user.dateNaissance ? (() => {
              const d = typeof user.dateNaissance === 'string' ? new Date(user.dateNaissance) : user.dateNaissance;
              return isNaN(d.getTime()) ? 'Non renseignée' : d.toLocaleDateString('fr-FR');
            })() : 'Non renseignée'}
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium">Adresse</Label>
          <p className="text-sm text-muted-foreground">{user.adresse}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Rôle</Label>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Membre depuis</Label>
          <p className="text-sm text-muted-foreground">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'Non renseigné'}
          </p>
        </div>
      </div>
    </div>
  );
}

export { EditProfile, ProfileBg, UserProfile };
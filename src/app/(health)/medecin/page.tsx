import { getUserInfo } from '@/lib/users/getUserInfo';
import MedecinCalendar from "@/components/medecin/MedecinCalendar";
import { RendezVousList } from "@/components/medecin/RendevousList";
import { MedecinProfileCard } from "@/components/medecin/MedecinProfileCard";
import { ScrollTransition } from "@/components/animation/ScrollTransition";

export default async function page() {
  const user = await getUserInfo();
  if (!user) return null;
  if (user?.role !== "MEDECIN") return ('/');

  return (
    <div className="flex flex-col gap-32 md:gap-44 px-1 max-w-5xl mx-auto py-16 md:py-24">
      {/* Section Profil - avec animation décalée et fluide */}
      <div className="flex flex-col md:flex-row gap-12 md:justify-between mb-16">
        <ScrollTransition direction="left" delay={0} distance={40} duration={0.8}>
          <MedecinProfileCard user={user} />
        </ScrollTransition>
        
        <ScrollTransition direction="right" delay={0.1} distance={40} duration={0.8}>
          <RendezVousList medecinId={user.id} />
        </ScrollTransition>
      </div>

    

    </div>
  );
}
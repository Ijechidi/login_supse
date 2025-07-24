import { getUserInfo } from '@/lib/users/getUserInfo';
import MedecinCalendar from "@/components/medecin/MedecinCalendar";
import { RendezVousList } from "@/components/medecin/RendevousList";
import { MedecinProfileCard } from "@/components/medecin/MedecinProfileCard";
import { ScrollTransition } from "@/components/animation/ScrollTransition";
import NextVisit from '@/components/medecin/NextVisit';

export default async function page() {
  const user = await getUserInfo();
  if (!user) return null;
  if (user?.role !== "MEDECIN") return ('/');

  return (
    <div className="flex flex-col gap-12 px-1  md:w-full md:p-12  mx-auto py-16 md:py-24">


        <ScrollTransition direction="left" delay={0} distance={40} duration={0.8}>
          <MedecinProfileCard user={user} />
        </ScrollTransition>
        


        <ScrollTransition direction="right" delay={0.1} distance={40} duration={0.8}>
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <div className='flex flex-col gap-8'>
                <h1 className="text-3xl text-center font-semibold text-primary">Historique de rendez-vous</h1>
                          <RendezVousList medecinId={user.id} />
              </div>
              <NextVisit medecinId={user.id}   />

            </div>

          
        </ScrollTransition>

    </div>
  );
}
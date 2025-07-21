
import MedecinCalendar from "@/components/medecin/MedecinCalendar";


export default async function page() {


  return (
    <div className="flex flex-col  justify-center items-center p-2 md:p-20">
        <div className="flex md:max-w-[900px] flex-col md:flex:row ">
          <MedecinCalendar />
          </div>
    </div>
  );
}
import { MedecinsShow } from "../ui/testimonials";


const medecins = [

    {
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    nom: 'Johnson',
    prenom: 'Alice',
    description: 'La cardiologie est ma passion depuis toujours',
    specialiter: 'Cardiologue',
    social: '[https://i.imgur.com/VRtqhGC.png ]',
    telephone: '+228 6 12 34 56 78',
    createdAt: '2023-10-01T12:00:00Z',
  },
];


export function TestimonialCard() {
  return (
    <div className="container py-10">
     <MedecinsShow medecins={medecins} />
    </div>
  )
}
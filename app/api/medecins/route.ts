import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const medecins = await prisma.medecin.findMany({
      include: {
        user: true,
      },
    });
// const medecins = [
//   {
//     id: "1",
//     userId: "u1",
//     specialite: "Cardiologie",
//     user: {
//       id: "u1",
//       email: "jean.dupont@example.com",
//       nom: "Dupont",
//       prenom: "Jean",
//       telephone: "0123456789",
//       dateNaissance: new Date("1980-05-15"),
//       adresse: "123 Rue de la Paix, Paris",
//       createdAt: new Date("2023-01-01T10:00:00Z"),
//     },
//   },
//   {
//     id: "2",
//     userId: "u2",
//     specialite: "Dermatologie",
//     user: {
//       id: "u2",
//       email: "marie.durand@example.com",
//       nom: "Durand",
//       prenom: "Marie",
//       telephone: "0987654321",
//       dateNaissance: new Date("1975-08-22"),
//       adresse: "45 Avenue des Champs-Élysées, Paris",
//       createdAt: new Date("2023-02-10T11:30:00Z"),
//     },
//   },
//   {
//     id: "3",
//     userId: "u3",
//     specialite: "Pédiatrie",
//     user: {
//       id: "u3",
//       email: "paul.martin@example.com",
//       nom: "Martin",
//       prenom: "Paul",
//       telephone: "0678901234",
//       dateNaissance: new Date("1985-03-10"),
//       adresse: "78 Boulevard Haussmann, Paris",
//       createdAt: new Date("2023-03-15T09:15:00Z"),
//     },
//   },
// ];



    console.log("Médecins récupérés :", medecins);

    return Response.json(medecins, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des médecins :", error);

    return Response.json(
      { message: "Une erreur est survenue lors de la récupération des médecins." },
      { status: 500 }
    );
  }
}

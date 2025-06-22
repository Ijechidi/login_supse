import { prisma } from "@/lib/prisma";

export async function GET() {
  const medecins = await prisma.medecin.findMany({
    include: {
      user: true,
    },
  });

  return Response.json(medecins);
}

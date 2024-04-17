import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();
  try {
    const groups = await prisma.group.findMany({
      where: {
        userId: session?.user?.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return Response.json({ success: true, data: groups });
  } catch (error) {
    return Response.json({ success: false, Error: error });
  }
}

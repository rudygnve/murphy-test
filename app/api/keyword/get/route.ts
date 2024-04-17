import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();
  try {
    const keywords = await prisma.keyword.findMany({
      where: {
        userId: session?.user?.id,
      },
    });

    return Response.json({ success: true, data: keywords });
  } catch (error) {
    return Response.json({ success: false, Error: error });
  }
}

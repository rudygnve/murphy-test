import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  const data = await request.json();
  if (!data) return Response.json({ success: false, message: "Missing data" });

  try {
    const deleteGroup = await prisma.group.delete({
      where: {
        userId_groupId: {
          userId: String(session?.user?.id),
          groupId: String(data.groupId),
        },
      },
    });
    return Response.json({ success: true, data: deleteGroup });
  } catch (error) {
    return Response.json({ success: false, Error: error });
  }
}

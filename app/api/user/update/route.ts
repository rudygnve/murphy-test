import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  const data = await request.json();
  if (!data.data.firstname && !data.data.lastname)
    return Response.json({ success: false, message: "Missing data" });
  try {
    const updateUser = await prisma.user.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        name: `${data.data.firstname} ${data.data.lastname}`,
      },
    });
    return Response.json({ success: true, data: updateUser });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, Eror: error });
  }
}

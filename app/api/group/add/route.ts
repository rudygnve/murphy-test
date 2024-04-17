import { auth } from "@/auth";
import { getGroupDetails } from "@/scraper/groupDetails";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/lib/getUserByEmail";

export async function POST(request: Request) {
  const session = await auth();
  const user = await getUserByEmail(String(session?.user?.email));
  const data = await request.json();
  if (!data) return Response.json({ success: false, message: "Missing data" });
  try {
    const groupDetails = await getGroupDetails(data.url);
    const addGroup = await prisma.group.create({
      data: {
        groupId: String(data.groupId),
        userId: String(user?.id),
        name: String(groupDetails.name),
        image: String(groupDetails.cover),
        uri: String(data.url),
        status: "pending",
      },
    });
    return Response.json({ success: true, data: addGroup });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, Error: error });
  }
}

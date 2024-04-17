import { auth } from "@/auth";
import prisma from "@/lib/db";
import { subscribedPlan } from "@/utils/subscribedPlan";

export async function POST(request: Request) {
  const session = await auth();
  const data = await request.json();
  console.log(data);
  if (!data) return Response.json({ success: false, message: "Missing data" });
  if (data.keywords.length < 0)
    return Response.json({ success: false, message: "No keywords" });

  let keywordError = "";

  try {
    data.keywords.forEach(async (keyword: string) => {
      const addKeyword = await prisma.keyword.create({
        data: {
          userId: String(session?.user?.id),
          name: String(keyword),
          groupId: [String(data.group)],
        },
      });
      // const existingKeyword = await prisma.keyword.findMany({
      //   where: {
      //     userId: String(session?.user?.id),
      //     name: String(keyword),
      //     groupId: data.group,
      //   },
      // });
      // if (existingKeyword) {
      //   keywordError.push(keyword);
      // }
    });

    return Response.json({
      success: true,
      message: "Keywords successfully added!",
      keywordError,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, Error: error });
  }
}

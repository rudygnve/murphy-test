import prisma from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  if (!data) return Response.json({ success: false, message: "Missing data" });

  try {
    const deleteKeyword = await prisma.keyword.delete({
      where: {
        id: String(data.keywordId),
      },
    });
    return Response.json({ success: true, data: deleteKeyword });
  } catch (error) {
    return Response.json({ success: false, Error: error });
  }
}

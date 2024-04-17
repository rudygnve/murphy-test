import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id as string,
    },
  });

  if (!user)
    return NextResponse.json({ success: false, message: "No user found!" });

  return NextResponse.json({ success: true, data: user });
}

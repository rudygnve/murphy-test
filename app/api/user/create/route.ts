import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  if (!data)
    return NextResponse.json({
      success: false,
      Error: {
        code: 100,
        message: "Missing data",
      },
    });

  if (data.password != data.cpassword)
    return NextResponse.json({
      success: false,
      Error: {
        code: 101,
        message: "Password don't match",
      },
    });

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createUser = await prisma.user.create({
    data: {
      email: data.email,
      name: `${data.firstname} ${data.lastname}`,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    success: true,
    data: createUser,
  });
}

import prisma from "./db";

export const getUserByEmail = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) return null;

  return existingUser;
};

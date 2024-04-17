import prisma from "./db";

export const getGroupsByUserId = async (id: string) => {
  const groups = await prisma.group.findMany({
    where: {
      userId: id,
    },
  });
  if (!groups) return null;

  return groups;
};

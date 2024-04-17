import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogOutBtn from "@/components/main/LogOutBtn";
import AvatarUpload from "@/components/main/AvatarUpload";
import prisma from "@/lib/db";

const Page = async () => {
  const session = await auth();
  async function handleUpdateUser(formData: FormData) {
    "use server";
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    if (!firstname)
      return alert("Please provide your First name and Last name");
    try {
      const updateUser = await prisma.user.update({
        where: {
          email: session?.user?.email as string,
        },
        data: {
          name: `${firstname} ${lastname}`,
        },
      });
      console.log(updateUser);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <form action={handleUpdateUser} className="w-full flex flex-col gap-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-primary"
            >
              First Name
            </label>
            <input
              name="firstname"
              type="text"
              className="w-full h-12 border rounded-md border-e-neutral-300 px-3"
              id="firstname"
              placeholder="John"
              defaultValue={session?.user?.name?.split(" ")[0]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-primary"
            >
              Last Name
            </label>
            <input
              name="lastname"
              type="text"
              className="w-full h-12 border rounded-md border-e-neutral-300 px-3"
              id="lastname"
              placeholder="Doe"
              defaultValue={session?.user?.name?.split(" ")[1]}
            />
          </div>
        </div>
        <AvatarUpload
          fallback={session?.user?.email ? String(session?.user?.email[0]) : ""}
          image={String(session?.user?.image)}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-primary">
            Email Address
          </label>
          <input
            type="email"
            className="w-full h-12 border rounded-md border-e-neutral-300 px-3 disabled:text-opacity-80 bg-primary/10 cursor-not-allowed"
            disabled={true}
            id="email"
            placeholder="john@example.com"
            value={session?.user?.email as string}
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <LogOutBtn />
          <Button>Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;

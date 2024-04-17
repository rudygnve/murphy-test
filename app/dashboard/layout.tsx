"use client";

import { auth } from "@/auth";
import DashboardLinks from "@/components/main/DashboardLinks";
import StatCard from "@/components/main/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { useDataContext } from "@/context/DataContext";
import { cn } from "@/lib/utils";
import Logo from "@/public/assets/images/murphy_white.png";
import { DashboardLayoutProps } from "@/types";
import { AlignJustify, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ children }: DashboardLayoutProps) => {
  const session = useSession();
  const { setGroupsByUserId, setKeywordsByUserId }: any = useDataContext();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getGroups = async () => {
        const groups = await fetch("/api/group/get");
        const data = await groups.json();
        setGroupsByUserId(data.data.reverse());
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const getKeywords = async () => {
      const keywords = await fetch("/api/keyword/get");
      const data = await keywords.json();
      setKeywordsByUserId(data.data.reverse());
    };
    try {
      getKeywords();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOpenCloseMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <main className="w-full h-screen overflow-hidden flex bg-prime">
      <Toaster />
      <div
        className={cn(
          "xl:w-60 sm:w-auto w-full xl:static fixed xl:inset-0 z-[10000] xl:bg-none bg-prime h-full flex flex-col justify-between p-5 pr-5 transition-all duration-200 left-[-150%]",
          showMenu && "left-0"
        )}
      >
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-between mb-6">
            <Link href="/dashboard" className="w-fit">
              <Image src={Logo} alt="Logo" className="w-28" />
            </Link>
            <button
              onClick={handleOpenCloseMenu}
              className="xl:hidden size-10 bg-white rounded-md flex items-center justify-center text-prime"
            >
              <X size={18} />
            </button>
          </div>
          <DashboardLinks setShowMenu={setShowMenu} />
        </div>
        <div className="flex flex-col gap-3">
          <StatCard />
          <Link
            onClick={() => setShowMenu(false)}
            href="/dashboard/settings"
            className="w-full p-3 rounded-md hover:bg-primary/15 flex items-center gap-2"
          >
            <Avatar>
              <AvatarImage src={String(session?.data?.user?.image)} />
              <AvatarFallback className="uppercase font-medium">
                {
                  // @ts-ignore
                  session?.data?.user?.name[0]
                }
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-white font-medium">
                {session.data?.user?.name || "..."}
              </span>
              <span className="text-white/80 text-sm">
                {!session.data
                  ? "..."
                  : // @ts-ignore
                  session?.user?.email?.length < 19
                  ? session?.data?.user?.email
                  : `${session?.data?.user?.email?.slice(0, 18)}...`}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="xl:p-5 xl:pl-0 pl-0 p-0 flex-1 h-full">
        <div className="bg-white w-full h-full rounded-none xl:rounded-xl flex flex-col">
          <div className="p-5 w-full flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <button
              onClick={handleOpenCloseMenu}
              className="size-10 xl:hidden bg-prime rounded-md flex items-center justify-center text-white"
            >
              <AlignJustify size={18} />
            </button>
          </div>
          <div className="p-5 pt-0 flex-1 grow w-full flex flex-col overflow-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

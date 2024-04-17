"use client";

import { DashboardRoutes } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLinks = ({ setShowMenu }: { setShowMenu: any }) => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-3">
      {DashboardRoutes.map((item) => (
        <li key={item.id}>
          <Link
            onClick={() => setShowMenu(false)}
            className={cn(
              "flex items-center px-3 gap-2 w-full h-12 rounded-md",
              pathname === `/dashboard${item.path}`
                ? "bg-white text-prime"
                : "hover:bg-primary/15 bg-none text-white/90"
            )}
            href={`/dashboard${item.path}`}
          >
            <item.icon size={22} />
            <span className="font-medium">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DashboardLinks;

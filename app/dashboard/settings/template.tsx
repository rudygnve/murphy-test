"use client";

import React from "react";
import Link from "next/link";
import { settingsRoutes } from "@/data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SettingsLayoutProps {
  children: React.ReactNode;
  subpath: string;
}

const SettingsLayout = ({ children, subpath = "" }: SettingsLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          {settingsRoutes.slice(0, 4).map((item) => (
            <Link
              key={item.label}
              href={`/dashboard/settings${item.route}`}
              className={cn(
                "py-3 px-3 border-b-2 border-primary/15 text-primary transition duration-200 font-medium hover:bg-primary/5",
                pathname === "/dashboard/settings" + item.route &&
                  "border-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;

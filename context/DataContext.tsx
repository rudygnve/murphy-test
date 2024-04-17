"use client";

import prisma from "@/lib/db";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

//@ts-ignore
const DataContext = createContext();

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [groupsByUserId, setGroupsByUserId] = useState<any>([]);
  const [keywordsByUserId, setKeywordsByUserId] = useState<any>([]);
  const [getUserById, setGetUserById] = useState<any>([]);

  return (
    <DataContext.Provider
      value={{
        groupsByUserId,
        setGroupsByUserId,
        keywordsByUserId,
        setKeywordsByUserId,
        getUserById,
        setGetUserById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}

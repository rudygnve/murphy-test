import React from "react";

export interface TipboxProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export interface CredentialsProps {
  email: string;
  password: string;
}

export interface SignUpDataProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface GroupProps {
  id: number | string;
  name: string;
  url: string;
  cover: string;
  status: "pending" | "approved" | "denied";
}

export interface TipboxProps {
  children: React.ReactNode;
  content: string;
  variant?: "default" | "destructive";
}

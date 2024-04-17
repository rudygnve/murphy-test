import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verifyEmailFormat = (email: string) => {
  const regex = /(.+)@(.+)\.(.+)/g;
  return regex.test(email);
};

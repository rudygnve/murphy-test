import { plans } from "@/data";

export const nextSubTier = (title: "Starter" | "Pro" | "Advanced") => {
  const tier = plans.filter((plan) => {
    return plan.title === title;
  });
  if (!tier) return null;
  return tier;
};

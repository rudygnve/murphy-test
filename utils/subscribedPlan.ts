import { plans } from "@/data";

export const subscribedPlan = plans.filter((plan) => {
  return plan.subscribe === true;
});

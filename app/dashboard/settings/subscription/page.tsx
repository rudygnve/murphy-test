"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCheckIcon,
  CheckCircle,
  CheckCircle2,
  CheckIcon,
} from "lucide-react";
import { plans, user } from "@/data";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { subscribedPlan } from "@/utils/subscribedPlan";

const page = () => {
  const [showYearly, setShowYearly] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      <div className="text-primary mb-6">
        You are currently subscribed to the{" "}
        <span className="font-semibold">{subscribedPlan[0].title}</span> plan.
      </div>
      {user.subscription.plan === "free" ? null : (
        <div className="flex items-center flex-wrap gap-3 mb-8">
          <Button variant="default">Manage Subscription</Button>
          <Button variant="destructive">Cancel Subscription</Button>
        </div>
      )}
      <div className="flex flex-col w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold text-primary mb-5">
            Plans & Pricing
          </h4>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-primary font-medium">Monthly</span>
            <Switch defaultValue="" onCheckedChange={(e) => setShowYearly(e)} />
            <span className="text-primary font-medium">Yearly</span>
          </div>
        </div>
        <div className="w-full gap-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title} className="w-full">
              <CardHeader>
                <CardTitle className="w-full flex items-center justify-between">
                  <span className="text-xl font-semibold">{plan.title}</span>
                  <span className="text-xl font-semibold">
                    ${showYearly ? plan.price.yearly : plan.price.monthly}
                    <span className="text-base font-medium">
                      /{showYearly ? "year" : "month"}
                    </span>
                  </span>
                </CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-5 p-4 bg-primary/5 rounded-md">
                  <div className="flex items-center text-prime gap-2">
                    <CheckIcon size={18} />
                    <span className="text-primary/90 font-medium">
                      {plan.perks.groups}{" "}
                      {Number(plan.perks.groups) === 1 ? "Group" : "Groups"}
                    </span>
                  </div>
                  <div className="flex items-center text-prime gap-2">
                    <CheckIcon size={18} />
                    <span className="text-primary/90 font-medium">
                      {plan.perks.keywords}{" "}
                      {Number(plan.perks.keywords) === 1
                        ? "Keyword"
                        : "Keywords"}
                    </span>
                  </div>
                  <div className="flex items-center text-prime gap-2">
                    <CheckIcon size={18} />
                    <span className="text-primary/90 font-medium capitalize">
                      {String(plan.perks.notifications)} SMS & Emails daily
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full disabled:opacity-80 disabled:cursor-not-allowed"
                  disabled={plan.subscribe}
                >
                  {plan.subscribe ? "Subscribed" : "Choose plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

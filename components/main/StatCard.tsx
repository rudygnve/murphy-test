"use client";

import React from "react";
import Tipbox from "./Tooltip";
import { Progress } from "../ui/progress";
import { useDataContext } from "@/context/DataContext";
import { subscribedPlan } from "@/utils/subscribedPlan";

const StatCard = () => {
  const { groupsByUserId, keywordsByUserId }: any = useDataContext();

  return (
    <>
      {subscribedPlan[0].title != "Advanced" && (
        <div className="w-full p-4 rounded-md bg-white flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-medium text-sm">
              Group Count
            </span>
            <Tipbox
              content={`${groupsByUserId?.length} out of ${subscribedPlan[0].perks.groups}`}
              text={`${groupsByUserId?.length} out of ${subscribedPlan[0].perks.groups}`}
            >
              <Progress
                className="h-2"
                value={
                  (Number(groupsByUserId?.length) /
                    Number(subscribedPlan[0].perks.groups)) *
                  100
                }
              />
            </Tipbox>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-primary font-medium text-sm">
              Keyword Count
            </span>
            <Tipbox
              content={`${keywordsByUserId?.length} out of ${subscribedPlan[0].perks.keywords}`}
              text={`${keywordsByUserId?.length} out of ${subscribedPlan[0].perks.keywords}`}
            >
              <Progress
                className="h-2"
                value={
                  (Number(keywordsByUserId?.length) /
                    Number(subscribedPlan[0].perks.keywords)) *
                  100
                }
              />
            </Tipbox>
          </div>
        </div>
      )}
    </>
  );
};

export default StatCard;

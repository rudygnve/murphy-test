"use client";

import Tipbox from "@/components/main/Tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useDataContext } from "@/context/DataContext";
import LoadingIcon from "@/public/assets/icons/loading.svg";
import { nextSubTier } from "@/utils/nextSubTier";
import { subscribedPlan } from "@/utils/subscribedPlan";
import { Group, Keyword } from "@prisma/client";
import { CheckIcon, Edit, Plus, Trash, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const page = () => {
  const {
    setGroupsByUserId,
    groupsByUserId,
    keywordsByUserId,
    setKeywordsByUserId,
  }: any = useDataContext();

  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [keywordsInput, setKeywordsInput] = useState("");
  const [groups, setGroups] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [revalidate, setRevalidate] = useState<boolean>(false);

  const handleAddKeywords = async (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    let keywordsArray = [];
    let keywordsLeft =
      Number(subscribedPlan[0].perks.keywords) -
      Number(keywordsByUserId?.length);
    // @ts-ignore
    if (keywordsInput.includes(",")) {
      if (keywordsInput.includes(", ")) {
        const newKeywordsInput = keywordsInput
          .replace(", ", ",")
          .toLocaleLowerCase();
        keywordsArray = newKeywordsInput.split(",");
      } else {
        keywordsArray = keywordsInput.split(",");
      }
      if (subscribedPlan[0].perks.keywords === "Unlimited") {
        try {
          const addKeywords = await fetch("/api/keyword/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              keywords: keywordsArray,
              group: selectedGroup,
            }),
          });
          if (addKeywords.ok) {
            setKeywordsInput("");
            const res = await addKeywords.json();
            console.log(res);
            document.querySelectorAll(".closeDialog").forEach((btn) => {
              // @ts-ignore
              return btn.click();
            });
            setRevalidate(!revalidate);
          } else {
            alert("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
          alert("Something went wrong!");
        }
      } else {
        if (
          Number(keywordsByUserId?.length) <
            Number(subscribedPlan[0].perks.keywords) &&
          (keywordsArray?.length < Number(keywordsLeft) ||
            keywordsArray?.length === keywordsLeft)
        ) {
          try {
            const addKeywords = await fetch("/api/keyword/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                keywords: keywordsArray,
                group: selectedGroup,
              }),
            });
            if (addKeywords.ok) {
              setKeywordsInput("");
              const res = await addKeywords.json();
              console.log(res);
              document.querySelectorAll(".closeDialog").forEach((btn) => {
                // @ts-ignore
                return btn.click();
              });
              setRevalidate(!revalidate);
            } else {
              alert("Something went wrong!");
            }
          } catch (error) {
            console.log(error);
            alert("Something went wrong!");
          }
        } else {
          alert("Keyword limits reached!");
        }
      }
    } else {
      if (subscribedPlan[0].perks.keywords === "Unlimited") {
        keywordsArray.push(keywordsInput.toLowerCase());
        try {
          const addKeyword = await fetch("/api/keyword/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              keywords: keywordsArray,
              group: selectedGroup,
              keywordLimit: subscribedPlan[0].perks.keywords,
              actualKeywordLength: keywordsByUserId?.length,
            }),
          });
          if (addKeyword.ok) {
            keywordsArray = [];
            setKeywordsInput("");
            const res = await addKeyword.json();
            console.log(res);
            document.querySelectorAll(".closeDialog").forEach((btn) => {
              // @ts-ignore
              return btn.click();
            });
            setRevalidate(!revalidate);
          } else {
            alert("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (
          Number(keywordsByUserId?.length) <
            Number(subscribedPlan[0].perks.keywords) &&
          (keywordsArray?.length < Number(keywordsLeft) ||
            keywordsArray?.length === keywordsLeft)
        ) {
          keywordsArray.push(keywordsInput.toLowerCase());
          try {
            const addKeyword = await fetch("/api/keyword/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                keywords: keywordsArray,
                group: selectedGroup,
                keywordLimit: subscribedPlan[0].perks.keywords,
                actualKeywordLength: keywordsByUserId?.length,
              }),
            });
            if (addKeyword.ok) {
              keywordsArray = [];
              setKeywordsInput("");
              const res = await addKeyword.json();
              console.log(res);
              document.querySelectorAll(".closeDialog").forEach((btn) => {
                // @ts-ignore
                return btn.click();
              });
              setRevalidate(!revalidate);
            } else {
              alert("Something went wrong!");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Keyword limits reached!");
        }
      }
    }
  };

  // Get groups by userId
  useEffect(() => {
    try {
      const getGroups = async () => {
        const groups = await fetch("/api/group/get");
        const data = await groups.json();
        setGroups(data.data.reverse());
        setGroupsByUserId(data.data);
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
      alert("Something went wrong!");
    }
  }, [revalidate]);

  const handleDeleteKeyword = async (keywordId: string) => {
    const removeKeyword = await fetch("/api/keyword/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywordId }),
    });
    if (!removeKeyword.ok) return alert("Something went wrong!");
    const res = await removeKeyword.json();
    if (!res.success) return alert("Unsuccessful!");
    console.log(res.data);
    setRevalidate(!revalidate);
    toast({
      title: "Keyword deleted",
      description: `${res.data.name} has successfully been deleted from keyword list`,
    });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between gap-6 mb-6">
        <h1 className="text-2xl font-semibold text-primary">Keywords</h1>
        <Dialog>
          <DialogClose className="hidden closeDialog"></DialogClose>
          <DialogTrigger>
            <div className="flex items-center h-10 px-4 justify-center gap-2 text-white text-sm font-medium rounded-md bg-prime hover:bg-prime/90">
              <Plus size={20} />
              Add keyword
            </div>
          </DialogTrigger>
          {Number(keywordsByUserId?.length) ===
          Number(subscribedPlan[0].perks.keywords) ? (
            <DialogContent className="w-full max-w-sm m-10">
              <DialogHeader>
                <DialogTitle className="text-center mb-2">
                  Oops! Keyword limits reached
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                  Try Our{" "}
                  <span className="font-semibold text-primary">
                    {
                      // @ts-ignore
                      nextSubTier(
                        subscribedPlan[0].title === "Starter"
                          ? "Pro"
                          : "Advanced"
                      )[0].title
                    }{" "}
                    Plan
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 p-4 bg-primary/5 rounded-md">
                <div className="flex items-center text-prime gap-2">
                  <CheckIcon size={18} />
                  <span className="text-primary/90 font-medium">
                    {
                      // @ts-ignore
                      nextSubTier(
                        subscribedPlan[0].title === "Starter"
                          ? "Pro"
                          : "Advanced"
                      )[0].perks.groups
                    }{" "}
                    {Number(
                      // @ts-ignore
                      nextSubTier(
                        subscribedPlan[0].title === "Starter"
                          ? "Pro"
                          : "Advanced"
                      )[0].perks.groups
                    ) === 1
                      ? "Groups"
                      : "Groups"}
                  </span>
                </div>
                <div className="flex items-center text-prime gap-2">
                  <CheckIcon size={18} />
                  <span className="text-primary/90 font-medium">
                    {
                      // @ts-ignore
                      nextSubTier(
                        subscribedPlan[0].title === "Starter"
                          ? "Pro"
                          : "Advanced"
                      )[0].perks.keywords
                    }{" "}
                    {Number(
                      // @ts-ignore
                      nextSubTier(
                        subscribedPlan[0].title === "Starter"
                          ? "Pro"
                          : "Advanced"
                      )[0].perks.keywords
                    ) === 1
                      ? "Keyword"
                      : "Keywords"}
                  </span>
                </div>
                <div className="flex items-center text-prime gap-2">
                  <CheckIcon size={18} />
                  <span className="text-primary/90 font-medium capitalize">
                    {String(subscribedPlan[0].perks.notifications)} SMS & Emails
                    daily
                  </span>
                </div>
              </div>
              <Button className="bg-prime gap-2 h-12 hover:bg-prime/90">
                <Zap size={18} />
                <span>
                  Upgrade To{" "}
                  {
                    // @ts-ignore
                    nextSubTier(
                      subscribedPlan[0].title === "Starter" ? "Pro" : "Advanced"
                    )[0].title
                  }
                </span>
              </Button>
            </DialogContent>
          ) : (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add keyword</DialogTitle>
                <form
                  onSubmit={handleAddKeywords}
                  className="flex flex-col gap-3 pt-6"
                >
                  <Label htmlFor="keywords">
                    Enter keywords (Seperate keywords using commas)
                  </Label>
                  <input
                    name="keywords"
                    id="keywords"
                    type="text"
                    className="w-full h-12 border px-3 rounded-md text-sm"
                    placeholder="ex. roofer, plumber"
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                  />
                  <Select onValueChange={(e) => setSelectedGroup(e)}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Groups</SelectItem>
                      {groupsByUserId?.map((group: Group) => (
                        <SelectItem value={group.name}>{group.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    disabled={loading}
                    className="w-full h-12 bg-prime flex items-cetner justify-center text-center disabled:opacity-60 disabled:cursor-not-allowed hover:bg-prime/90"
                  >
                    {loading ? (
                      <Image
                        src={LoadingIcon}
                        alt="Loading"
                        className="w-6 animate-spin"
                      />
                    ) : (
                      "Add keyword"
                    )}
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {keywordsByUserId &&
          keywordsByUserId?.map((key: Keyword) => (
            <div
              key={key.id}
              className="border border-primary/20 w-full p-5 rounded-md relative flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="text-primary font-semibold text-xl">
                  {key.name}
                </div>
              </div>
              <div className="w-full flex items-center justify-between mb-5">
                <div className="text-primary/40 font-semibold">
                  Posts: <span className="text-primary">0</span>
                </div>
              </div>
              <div className="pt-5 border-t flex items-center justify-center gap-8">
                <Tipbox text="Edit" content="Edit">
                  <Link href="">
                    <Edit
                      size={18}
                      className="text-muted-foreground transition duration-200 hover:text-primary cursor-pointer"
                    />
                  </Link>
                </Tipbox>
                <Tipbox text="Delete" content="Delete" variant="destructive">
                  <div>
                    <Trash
                      type="button"
                      onClick={() => handleDeleteKeyword(key.id)}
                      size={18}
                      className="text-muted-foreground transition duration-200 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </Tipbox>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;

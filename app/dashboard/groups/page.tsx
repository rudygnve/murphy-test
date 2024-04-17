"use client";

import DataTable from "@/components/main/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useDataContext } from "@/context/DataContext";
import { groups, plans } from "@/data";
import LoadingIcon from "@/public/assets/icons/loading.svg";
import { isValidURL } from "@/utils/isValidURL";
import { DialogDescription } from "@radix-ui/react-dialog";
import { CheckIcon, Plus, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { subscribedPlan } from "@/utils/subscribedPlan";
import { nextSubTier } from "@/utils/nextSubTier";

const Page = () => {
  // @ts-ignore
  const { groupsByUserId, setGroupsByUserId } = useDataContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<any>();
  const [filteredGroups, setFilteredGroups] = useState<[]>([]);
  const [url, setUrl] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [revalidate, setRevalidate] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    return () => {
      setIsClient(false);
    };
  }, []);

  // Add new group
  const handleAddGroup = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidURL(url))
      return toast({
        variant: "destructive",
        title: "Unvalid Facebook Group URL",
        description: "Please enter a valid Facebook Group URL",
      });
    if (url.length < 1) return alert("Please provide a Facebook Group URL!");

    const groupId = url.split("/").pop();

    const isAlreadyAdded = groupsByUserId?.filter((group: any) => {
      return group.groupId === groupId;
    });

    if (isAlreadyAdded?.length > 0) {
      return toast({
        variant: "destructive",
        title: "Group Already Added",
        description: `${isAlreadyAdded[0].name} is already in your group list`,
      });
    }
    setLoading(true);
    const closeDialog = document.querySelectorAll(".closeDialog");
    try {
      const addGroup = await fetch("/api/group/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId, url }),
      });
      setUrl("");
      const res = await addGroup.json();
      if (res.success) {
        toast({
          title: "Group successfully added",
          description: "Now wait for approval.",
        });
        closeDialog.forEach((btn) => {
          // @ts-ignore
          return btn.click();
        });
        setRevalidate(!revalidate);
        setLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Group already added",
          description: `${isAlreadyAdded.name[0]} is already in your group list`,
        });
        console.log(res.Error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const getGroups = async () => {
        const groups = await fetch("/api/group/get");
        const data = await groups.json();
        setGroups(data.data);
        setFilteredGroups(data.data);
        setGroupsByUserId(data.data);
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, [revalidate]);

  return (
    <div className="flex flex-col w-full">
      <Toaster />
      <div className="w-full flex items-center justify-between gap-6 mb-6 sticky top-0 z-[1000] bg-white">
        <h1 className="text-2xl font-semibold text-primary">Groups</h1>
        <Dialog>
          <DialogClose className="hidden closeDialog"></DialogClose>
          <DialogTrigger>
            <div className="flex items-center h-10 px-4 justify-center gap-2 text-white text-sm font-medium rounded-md bg-prime hover:bg-prime/90">
              <Plus size={20} />
              Add group
            </div>
          </DialogTrigger>

          {Number(groupsByUserId?.length) ===
          Number(subscribedPlan[0].perks.groups) ? (
            <DialogContent className="w-full max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-center mb-2">
                  Oops! Groups limits reached
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
                <DialogTitle>Add a group</DialogTitle>
                <form
                  onSubmit={handleAddGroup}
                  className="flex flex-col gap-3 pt-6"
                >
                  <Label htmlFor="url">Enter Facebook Group URL</Label>
                  <input
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    id="url"
                    type="url"
                    className="w-full h-12 border px-3 rounded-md text-sm"
                    placeholder="https://www.facebook.com/groups/1234567890"
                  />
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
                      "Add Group"
                    )}
                  </Button>
                </form>
              </DialogHeader>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="grow w-screen xl:w-full verflow-x-scroll">
        <DataTable data={groupsByUserId} />
      </div>
    </div>
  );
};

export default Page;

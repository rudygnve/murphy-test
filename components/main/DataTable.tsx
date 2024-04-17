"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GroupProps } from "@/types";
import { Group } from "@prisma/client";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import Tipbox from "./Tipbox";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDataContext } from "@/context/DataContext";

const DataTable = ({ data }: any) => {
  const { setGroupsByUserId }: any = useDataContext();
  const { toast } = useToast();
  const [revalidate, setRevalidate] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getGroups = async () => {
        const groups = await fetch("/api/group/get");
        const data = await groups.json();
        setGroupsByUserId(data.data);
      };
      getGroups();
    } catch (error) {
      console.log(error);
    }
  }, [revalidate]);

  const handleDeleteGroup = async (groupId: string) => {
    try {
      const deleteGroup = await fetch("/api/group/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId }),
      });
      const res = await deleteGroup.json();
      console.log(res);
      if (!deleteGroup.ok) return alert("Something went wrong!");
      toast({
        title: "Group successfully deleted",
        description: `${res.data.name} has been deleted from your group list`,
      });
      setRevalidate(!revalidate);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="grow flex-1">
      <Toaster />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">Groups</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Keywords</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data?.map((item: Group) => (
            <TableRow key={item.groupId} className="group">
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover object-center"
                    src={String(item.image)}
                  />
                  <AvatarFallback className="uppercase font-semibold">
                    {item.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-primary font-medium">{item.name}</span>
                  <Link
                    href={String(item.uri)}
                    target="_blank"
                    className="text-muted-foreground text-sm"
                  >
                    {item.uri}
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "text-xs px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-600 font-mono",
                    item.status === "approved"
                      ? "bg-green-600/20 text-green-600"
                      : item.status === "denied" && "bg-red-600/20 text-red-600"
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="w-[200px]">
                <div className="xl:hidden flex group-hover:flex items-center gap-4">
                  <Tipbox content="View" text="View">
                    <Link
                      href={String(item.uri)}
                      target="_blank"
                      className="w-10 h-10 rounded-md hover:bg-primary/5 transition duration-200 flex items-center justify-center"
                    >
                      <Eye size={18} className="text-primary/60" />
                    </Link>
                  </Tipbox>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Tipbox
                        content="Delete"
                        text="Delete"
                        className="bg-red-500"
                      >
                        <button className="w-10 h-10 rounded-md hover:bg-primary/5 transition duration-200 flex items-center justify-center">
                          <Trash size={18} className="text-red-600" />
                        </button>
                      </Tipbox>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete group?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the group and remove the data. Are you sure you
                          want to delete this group?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteGroup(item.groupId)}
                          className="bg-red-600 hover:bg-red-600/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;

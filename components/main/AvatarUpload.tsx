"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { File } from "buffer";

const AvatarUpload = ({
  image,
  fallback,
}: {
  image: string;
  fallback: string;
}) => {
  const [newImageURL, setNewImageURL] = useState<string>("");

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const url = URL.createObjectURL(e.target.files[0]);
    setNewImageURL(url);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-primary">Avatar</span>
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage
            className="size-12 object-cover object-center"
            src={newImageURL ? newImageURL : String(image)}
          />
          <AvatarFallback className="uppercase font-medium ">
            {
              // @ts-ignore
              fallback
            }
          </AvatarFallback>
        </Avatar>
        <input
          onChange={handleUpdateImage}
          type="file"
          accept="image/*"
          id="upload"
          hidden
          name="avatar"
        />
        <label htmlFor="upload" className="cursor-pointer">
          Upload
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;

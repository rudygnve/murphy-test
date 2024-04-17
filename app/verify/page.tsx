"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Page = () => {
  const [code, setCode] = useState<string>("");

  const handleVerifyCode = () => {
    if (code.length < 6) {
      alert("Fill all the inputs");
    } else {
      alert(code);
    }
  };

  return (
    <main className="w-full min-h-screen h-screen flex items-center justify-center text-center">
      <div className="w-full max-w-sm mx-auto flex flex-col">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Check your inbox
        </h1>
        <span className="text-muted-foreground mb-4 text-sm">
          An email containing a 6-digit code has been sent to your mail inbox.
          Please provide it below to verify your email.
        </span>
        <div className="w-full flex items-center justify-center">
          <InputOTP maxLength={6} onChange={(e) => setCode(e)}>
            <InputOTPGroup className="self-center">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          onClick={handleVerifyCode}
          className="w-full h-12 bg-prime mt-6 hover:bg-prime/90 mb-4"
        >
          Verify
        </Button>
        <Button
          variant="link"
          onClick={() => signOut()}
          className="text-prime underline text-center"
        >
          Cancel
        </Button>
      </div>
    </main>
  );
};

export default Page;

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Logo from "@/public/assets/images/murphy_logo.png";
import { Label } from "@radix-ui/react-label";
import { SignUpDataProps } from "@/types";
import { cn, verifyEmailFormat } from "@/lib/utils";
import { AtSign, Eye, EyeOff } from "lucide-react";
import Tipbox from "@/components/main/Tooltip";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, setData] = useState<SignUpDataProps>({
    firstname: "Rudy",
    lastname: "Genave",
    email: "rudygnve11@gmail.com",
    password: "RUdy0911#",
    cpassword: "RUdy0911#",
  });

  useEffect(() => {
    setEmailIsValid(verifyEmailFormat(data.email));
  }, [data.email]);

  const handleSignUpWithCredentials = async (e: FormEvent) => {
    e.preventDefault();
    if (data.password != data.cpassword) {
      alert("Password don't match");
    } else {
      try {
        const createUser = await fetch("api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await createUser.json();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="w-full min-h-screen h-full flex items-center justify-center">
      <div className="w-full h-full max-w-xl mx-auto flex flex-col">
        <div className="w-full flex flex-col gap-3 items-center justify-center text-center mb-5">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="w-32" />
          </Link>
          <h1 className="text-2xl font-extrabold">Create an account</h1>
          <span className="text-muted-foreground max-w-md w-full leading-6">
            Welcome to Murply! Please enter the required information to create
            your account.
          </span>
        </div>
        <form
          onSubmit={handleSignUpWithCredentials}
          className="w-full flex flex-col gap-5 mb-4"
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstname">Firstname</Label>
              <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                <input
                  value={data.firstname}
                  onChange={(e) =>
                    setData({
                      firstname: e.target.value,
                      lastname: data.lastname,
                      email: data.email,
                      password: data.password,
                      cpassword: data.cpassword,
                    })
                  }
                  type="text"
                  name="firstname"
                  className="flex-1 h-full px-3 bg-transparent text-sm"
                  placeholder="John"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstname">Lastname</Label>
              <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                <input
                  value={data.lastname}
                  onChange={(e) =>
                    setData({
                      firstname: data.firstname,
                      lastname: e.target.value,
                      email: data.email,
                      password: data.password,
                      cpassword: data.cpassword,
                    })
                  }
                  type="text"
                  name="lastname"
                  className="flex-1 h-full px-3 bg-transparent text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
              <input
                value={data.email}
                onChange={(e) =>
                  setData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: e.target.value,
                    password: data.password,
                    cpassword: data.cpassword,
                  })
                }
                type="email"
                name="email"
                className="flex-1 h-full px-3 bg-transparent text-sm"
                placeholder="john@example.com"
              />
              <div className="pr-3">
                <AtSign
                  size={18}
                  className={cn(
                    "text-muted-foreground",
                    data.email && data.email?.length > 0
                      ? emailIsValid
                        ? "text-green-600"
                        : "text-red-600"
                      : "text-muted-foreground"
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                <input
                  value={data.password}
                  onChange={(e) =>
                    setData({
                      firstname: data.firstname,
                      lastname: data.lastname,
                      email: data.email,
                      password: e.target.value,
                      cpassword: data.cpassword,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="flex-1 h-full px-3 bg-transparent text-sm"
                  placeholder="••••••••"
                />
                <div className="pr-3">
                  {showPassword ? (
                    <Tipbox content="" text="Hide Password">
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        size={18}
                        className="text-muted-foreground"
                      />
                    </Tipbox>
                  ) : (
                    <Tipbox content="" text="Show Password">
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        size={18}
                        className="text-muted-foreground"
                      />
                    </Tipbox>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                <input
                  value={data.cpassword}
                  onChange={(e) =>
                    setData({
                      firstname: data.firstname,
                      lastname: data.lastname,
                      email: data.email,
                      password: data.password,
                      cpassword: e.target.value,
                    })
                  }
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="flex-1 h-full px-3 bg-transparent text-sm"
                  placeholder="••••••••"
                />
                <div className="pr-3">
                  {showPassword ? (
                    <Tipbox content="" text="Hide Password">
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        size={18}
                        className="text-muted-foreground"
                      />
                    </Tipbox>
                  ) : (
                    <Tipbox content="" text="Show Password">
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        size={18}
                        className="text-muted-foreground"
                      />
                    </Tipbox>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button className="h-12 bg-prime hover:bg-prime/90">Continue</Button>
        </form>
        <span className="text-sm text-muted-foreground text-center mb-6">
          By clicking "Continue" you agree to our{" "}
          <Link
            href="/legal/terms"
            className="font-medium text-primary/80 underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy-policy"
            className="font-medium text-primary/80 underline"
          >
            Privacy Policy
          </Link>
        </span>
        <span className="text-center">
          Already got an account?{" "}
          <Link href="/login" className="text-prime font-medium">
            Login
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Page;

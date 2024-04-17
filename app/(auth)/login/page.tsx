"use client";

import Tipbox from "@/components/main/Tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn, verifyEmailFormat } from "@/lib/utils";
import GoogleIcon from "@/public/assets/icons/google.svg";
import Logo from "@/public/assets/images/murphy_logo.png";
import { CredentialsProps } from "@/types";
import { AtSign, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const Page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<CredentialsProps>({
    email: "rudygnve11@gmail.com",
    password: "RUdy0911#",
  });
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  const handleLoginWithCredentials = async (e: FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirectTo: "https://localhost:3000/test",
    });
  };

  useEffect(() => {
    setEmailIsValid(verifyEmailFormat(credentials.email));
  }, [credentials.email]);

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  return (
    <main className="w-full min-h-screen h-screen flex items-center justify-center">
      <div className="w-full h-full grid grid-cols-2">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-sm mx-auto flex flex-col">
            <div className="flex flex-col mb-6">
              <div className="w-full flex items-center justify-between">
                <Link href="/" className="mb-3">
                  <Image src={Logo} className="w-28" alt="Logo" />
                </Link>
                <span className="text-muted-foreground">
                  New here?{" "}
                  <Link href="sign-up" className="text-prime font-medium">
                    Sign Up
                  </Link>
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-primary mb-2">
                Login
              </h1>
              <span className="text-muted-foreground">
                Please enter your details to login
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleSignInWithGoogle}
                className="gap-3 h-12 bg-transparent hover:bg-accent border"
              >
                <Image src={GoogleIcon} alt="" className="w-5" />
                <span className="text-primary">Continue with Google</span>
              </Button>
            </div>
            <div className="py-5 flex items-center w-full gap-2">
              <div className="h-[1px] bg-muted-foreground/15 flex-1"></div>
              <div className="text-sm font-medium text-muted-foreground/60">
                OR CONTINUE WITH EMAIL
              </div>
              <div className="h-[1px] bg-muted-foreground/15 flex-1"></div>
            </div>
            <form
              onSubmit={handleLoginWithCredentials}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                  <input
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({
                        email: e.target.value,
                        password: credentials.password,
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
                        credentials.email && credentials.email?.length > 0
                          ? emailIsValid
                            ? "text-green-600"
                            : "text-red-600"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center w-full h-12 border rounded-md overflow-hidden">
                  <input
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        email: credentials.email,
                        password: e.target.value,
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
              <Button className="h-12 bg-prime hover:bg-prime/90">
                Continue
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full h-full bg-prime"></div>
      </div>
    </main>
  );
};

export default Page;

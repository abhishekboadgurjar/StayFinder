"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Home, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("guest");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isHost = accountType === "host";
      await register(name, email, password, isHost);
      toast({
        title: "Registration successful",
        description: `Welcome to StayFinder${isHost ? " as a Host" : ""}!`,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Join StayFinder to book amazing properties or become a host
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Account Type</Label>
              <RadioGroup
                value={accountType}
                onValueChange={setAccountType}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="guest" id="guest" />
                  <div className="flex items-center space-x-3 flex-1">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label
                        htmlFor="guest"
                        className="font-medium cursor-pointer"
                      >
                        Guest Account
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Book and stay at amazing properties
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="host" id="host" />
                  <div className="flex items-center space-x-3 flex-1">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="host" className="font-medium cursor-pointer">
                        Host Account
                      </Label>
                      <p className="text-sm text-muted-foreground">List your properties and earn money</p>
                    </div>
                  </div>
                </div> */}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Creating account..."
                : `Create ${accountType === "host" ? "Host" : "Guest"} Account`}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

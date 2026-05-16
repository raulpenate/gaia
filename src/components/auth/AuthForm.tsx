"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthForm() {
  const t = useTranslations("Auth");

  return (
    <div className="w-full max-w-md">
      {/* Mobile logo */}
      <div className="mb-8 text-center lg:hidden">
        <h1 className="font-serif text-3xl font-bold tracking-[3px] text-foreground">
          GAIA
        </h1>
      </div>

      <Tabs defaultValue="signup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">{t("signupTab")}</TabsTrigger>
          <TabsTrigger value="signin">{t("signinTab")}</TabsTrigger>
        </TabsList>

        {/* Sign Up */}
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("signupTitle")}</CardTitle>
              <CardDescription>{t("signupDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">{t("firstName")}</Label>
                    <Input id="first-name" placeholder="Juan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">{t("lastName")}</Label>
                    <Input id="last-name" placeholder="García" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("email")}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="juan@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("password")}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("signupButton")}
                </Button>

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground uppercase">
                    {t("orContinueWith")}
                  </span>
                  <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full" type="button">
                  <GoogleIcon />
                  Google
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sign In */}
        <TabsContent value="signin">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("signinTitle")}</CardTitle>
              <CardDescription>{t("signinDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t("email")}</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="juan@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">{t("password")}</Label>
                    <a
                      href="#"
                      className="text-sm text-primary no-underline hover:underline"
                    >
                      {t("forgotPassword")}
                    </a>
                  </div>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("signinButton")}
                </Button>

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground uppercase">
                    {t("orContinueWith")}
                  </span>
                  <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full" type="button">
                  <GoogleIcon />
                  Google
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { buttonVariants } from "@/components/ui/button";

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";

import { cn } from "@/lib/utils";

import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/auth/reset"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Reset Password ?
                </Link>
                <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-[url('/img/login-bg.jpg')] bg-cover bg-center " />
                    <div className="relative z-20 flex items-center text-lg font-medium m-5">
                        <Logo />
                    </div>
                    <div className="relative z-20 mt-auto m-5">
                        <blockquote className="space-y-2">
                            <p className="text-base">
                                &ldquo;Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.&rdquo;
                            </p>
                            <footer className="text-sm">
                                Friedrich Nietzsche
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below to login to your account
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
};
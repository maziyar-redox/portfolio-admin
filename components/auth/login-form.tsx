"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useState, useTransition } from "react";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormError, FormSuccess } from "@/components/auth/form-states";

import { SpinnerIcon } from "@/components/svg/spinner";
import { FaGithub } from "react-icons/fa";

import { LoginSchema } from "@/schema";

import { login } from "@/actions/login";

export function LoginForm() {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values)
            .then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                };
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                };
            }).catch(() => setError("Something went wrong!"));
        });
    };
    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="password"
                                                placeholder="******"
                                                type="password"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button disabled={isPending}>
                            {isPending && (
                                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isPending}>
                {isPending ? (
                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                ): (
                    <FaGithub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </Button>
        </div>
    );
};
"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { AccountSettingSchema } from "@/schema";

import { useState, useTransition } from "react";

import { accountSetting } from "@/actions/account-setting";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { SpinnerIcon } from "@/components/svg/spinner";

interface AccountSettingProps {
    isTwoFactorEnabled: boolean;
};

export function AccountSetting({
    isTwoFactorEnabled
}: AccountSettingProps) {
    const [isTwoFactor, setIsTwoFactor] = useState(isTwoFactorEnabled);
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof AccountSettingSchema>>({
        resolver: zodResolver(AccountSettingSchema),
        defaultValues: {
            isTwoFactor: isTwoFactor
        },
    });
    async function onSubmit(values: z.infer<typeof AccountSettingSchema>) {
        startTransition(() => {
            accountSetting(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    };
                    if (data.success) {
                        setIsTwoFactor(values.isTwoFactor as boolean);
                        toast.success(data.success);
                    };
                }).catch(() => toast.error("Something went wrong"));
        });
    };
    return (
        <Card className="lg:col-span-2 col-span-4">
            <CardHeader>
                <CardTitle className="font-medium text-white text-lg">
                    Account Setting
                </CardTitle>
                <CardDescription className="font-light">
                    Manage your account setting in here
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="isTwoFactor"
                            render={({ field }) => (
                                <div className="flex items-center justify-between space-x-2">
                                    <FormLabel htmlFor="twofactor" className="flex flex-col space-y-1">
                                        <span className="flex flex-row items-center gap-x-2">
                                            <h1 className="text-sm md:text-base">
                                                Two Factor Authentication
                                            </h1>
                                            <Badge className="rounded-full">
                                                {isTwoFactor ? "On" : "Off"}
                                            </Badge>
                                        </span>
                                        <span className="font-light text-xs md:text-sm leading-snug text-muted-foreground">
                                            You can turn on or off your two factor in here.
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            id="twofactor"
                                            checked={field.value}
                                            disabled={isPending}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={form.getValues().isTwoFactor === isTwoFactor || isPending} variant="outline" className="w-full">
                            {isPending && (
                                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Submit changes
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};
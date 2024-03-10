"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";

import { getUserByEmail } from "@/data/user";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedField = LoginSchema.safeParse(values);
    if (!validatedField.success) {
        return { error: "Invalid fields!" };
    };
    const { email, password } = validatedField.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "User does not exist!" };
    };
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" };
                case "AccessDenied":
                    return { error: "For some reason access is denied!" };
                default:
                    return { error: "Something went wrong" };
            };
        };
        throw error;
    };
};
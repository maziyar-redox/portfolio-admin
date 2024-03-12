"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";

import { getUserByEmail } from "@/data/user";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

import { db } from "@/lib/db";

import { getTwoFactorConfirmtaion } from "@/data/two-factor-confirmtaion";

import { generateTwoFactorToken } from "@/lib/tokens";

import { sendTwoFactorEmail } from "@/lib/mail";

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedField = LoginSchema.safeParse(values);
    if (!validatedField.success) {
        return { error: "Invalid fields!" };
    };
    const { email, password, code } = validatedField.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "User does not exist!" };
    };
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorToken) {
                return { error: "Invalid token!" };
            };
            if (twoFactorToken.token !== code) {
                return { error: "Invalid token!" };
            };
            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return { error: "Token has expired" };
            };
            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                },
            });
            const existingConfirmation = await getTwoFactorConfirmtaion(existingUser.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    },
                });
            };
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token);
            return { twoFactor: true };
        };
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
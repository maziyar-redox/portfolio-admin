"use server";

import * as z from "zod";

import { AccountSettingSchema } from "@/schema";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function accountSetting(values: z.infer<typeof AccountSettingSchema>) {
    const validatedFields = AccountSettingSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    };
    const { isTwoFactor } = validatedFields.data;
    const session = await auth();
    if (!session) {
        return { error: "Invalid session" };
    };
    await db.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            isTwoFactorEnabled: isTwoFactor
        },
    });
    return { success: "Account info changed successfuly" };
};
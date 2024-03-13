"use server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

import { AccountDetailSchema } from "@/schema";

import * as z from "zod";


export async function accountDetails(values: z.infer<typeof AccountDetailSchema>) {
    const validatedFields = AccountDetailSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid inputs!" };
    };
    const session = await auth();
    if (!session?.user) {
        return { error: "Invalid session!" };
    };
    const { email, lastName, firstName, type } = validatedFields.data;
    await db.user.update({
        where: {
            id: session.user.id
        },
        data: {
            email: email,
            lastName: lastName,
            firstName: firstName,
            role: type
        },
    });
    return { success: "Your account info updated successfuly" };
};
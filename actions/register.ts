"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schema";

import { getUserByEmail, getUsersCount } from "@/data/user";

import { db } from "@/lib/db";

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    };
    const usersCount = await getUsersCount();
    if (usersCount && usersCount > 0) {
        return { error: "Something went wrong!" };
    };
    const { email, password, userName } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already exist!" };
    };
    await db.user.create({
        data: {
            name: userName,
            email: email,
            password: hashedPassword
        },
    });
    return { success: "Account created!" };
};
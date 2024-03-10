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
        return { error: "You cannot create a new user at this time!" };
    };
    const { email, password, firstName, lastName } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already exist!" };
    };
    await db.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        },
    });
    return { success: "Account created!" };
};
"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedField = LoginSchema.safeParse(values);
    if (!validatedField.success) {
        return { error: "Invalid fields!" };
    };
    return { success: "Login successful!" };
};
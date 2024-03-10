"use server";

import { getUserByEmail } from "@/data/user";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

import { ResetSchema } from "@/schema";

import * as z from "zod";

export async function resetPassword(values: z.infer<typeof ResetSchema>) {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    };
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email does not exist!" };
    };
    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) {
        return { error: "Another link is exist!" };
    };
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    return { success: "Password reset link sent!" };
};
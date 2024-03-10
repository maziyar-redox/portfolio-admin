import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

import { v4 as uuid } from "uuid";

import { db } from "@/lib/db";

export async function generatePasswordResetToken(email: string) {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken && existingToken.expires > new Date()) {
        return null;
    };
    if (existingToken && existingToken.expires < new Date()) {
        await db.passowrdResetToken.delete({
            where: { id: existingToken.id }
        });
    };
    const passwordResetToken = await db.passowrdResetToken.create({
        data: {
            email: email,
            expires: expires,
            token: token
        },
    });
    return passwordResetToken;
};
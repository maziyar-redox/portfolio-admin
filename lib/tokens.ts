import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

import crypto from "crypto";

import { v4 as uuid } from "uuid";

import { db } from "@/lib/db";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

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

export async function generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 3600 * 1000);
    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            },
        });
    };
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email: email,
            token: token,
            expires: expires
        },
    });
    return twoFactorToken;
};
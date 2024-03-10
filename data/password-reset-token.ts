import { db } from "@/lib/db";

export async function getPasswordResetTokenByToken(token: string) {
    try {
        const passwordToken = await db.passowrdResetToken.findFirst({
            where: { token: token }
        });
        return passwordToken;
    } catch {
        return null;
    };
};

export async function getPasswordResetTokenByEmail(email: string) {
    try {
        const passwordToken = await db.passowrdResetToken.findFirst({
            where: { email: email }
        });
        return passwordToken;
    } catch {
        return null;
    }
};
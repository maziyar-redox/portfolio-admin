import { db } from "@/lib/db";

export async function getTwoFactorConfirmtaion(userId: string) {
    try {
        const twoFactorConfirmtaion = await db.twoFactorConfirmation.findUnique({
            where: {
                userId: userId
            },
        });
        return twoFactorConfirmtaion;
    } catch {
        return null;
    };
};
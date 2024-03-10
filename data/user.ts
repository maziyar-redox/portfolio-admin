import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({
            where: { email }
        });
        return user;
    } catch {
        return null;
    };
};

export async function getUserById(token: string) {
    try {
        const user = await db.user.findUnique({
            where: { id: token }
        });
        return user;
    } catch {
        return null;
    };
};

export async function getUsersCount() {
    try {
        const userCount = await db.user.count();
        return userCount;
    } catch {
        return null;
    };
};
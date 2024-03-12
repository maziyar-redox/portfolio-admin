import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth";

import { db } from "@/lib/db";

import { getUserById } from "@/data/user";

import authConfig from "@/auth.config";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            };
            const existingUser = await getUserById(user.id as string);
            if (existingUser?.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmtaion(existingUser.id);
                if (!twoFactorConfirmation) {
                    return false;
                };
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    },
                });
            };
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            };
            if (token.role && session.user) {
                session.user.role = token.role;
            };
            if (token.firstName && token.lastName) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            };
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            token.firstName = existingUser.firstName as string;
            token.lastName = existingUser.lastName as string;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
});

import { JWT } from "@auth/core/jwt";

import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmtaion } from "./data/two-factor-confirmtaion";

declare module "@auth/core/jwt" {
    interface JWT {
        role?: UserRole;
        firstName?: string;
        lastName?: string;
    }
};
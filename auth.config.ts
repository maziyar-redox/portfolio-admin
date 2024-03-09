import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
/* import Github from "next-auth/providers/github"; */

import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schema/index";

import { getUserByEmail } from "./data/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    return user;
                };
                return null;
            }
        }),
    ],
} satisfies NextAuthConfig;
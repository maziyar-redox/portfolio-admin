
import { UserRole } from "@prisma/client";

import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, {
        message: "Required length is not correct!"
    }).email({
        message: "Entered values is not a valid email!"
    }),
    password: z.string().min(6, {
        message: "Enter a valid password!"
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().min(5, {
        message: "Required length is not correct!"
    }).email({
        message: "Entered values is not a valid email!"
    }),
    password: z.string().min(6, {
        message: "Enter a valid password!"
    })
});

export const ResetSchema = z.object({
    email: z.string().min(5, {
        message: "Required length is not correct!"
    }).email({
        message: "Entered values is not a valid email!"
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Required length is not correct!"
    })
});

export const AccountSettingSchema = z.object({
    isTwoFactor: z.boolean().optional()
});

interface AccountDetailSchemaProps {
    firstName: string;
    lastName: string;
    email: string;
    type: UserRole;
};

const UserRoleEnum = z.nativeEnum(UserRole);

export const AccountDetailSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().min(5, {
        message: "Required length is not correct!"
    }).email({
        message: "Entered values is not a valid email!"
    }),
    type: UserRoleEnum
});
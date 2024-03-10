import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, {
        message: "Required length is not correct!"
    }).email({
        message: "Entered values is not a valid email!"
    }),
    password: z.string().min(6, {
        message: "Enter a valid password!"
    })
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
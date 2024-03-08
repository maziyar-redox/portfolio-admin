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
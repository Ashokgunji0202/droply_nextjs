import * as z from "zod";

export const signUpSchema = z.object({
    email: z.string().min(1,{ message: "Please enter an email"}).email({ message: "Please enter a valid email" }),
    password: z.string().min(1,{ message: "Please enter a password"})
        .min(8, { message: "Password must be at least 8 characters long" }),

    passwordConfirm: z.string().min(1,{ message: "Please enter a password"})
        .min(8, { message: "Password must be at least 8 characters long" }),
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],  
})
import * as z from "zod";

export const signInSchema = z.object({
    identifier: z.string()
        .min(1,{ message: "Please enter an email"})
        .email(),
    password: z.string().min(1,{message:"password is required"})
         .min(8,{message:"Password must and should be 8 characters"})
});
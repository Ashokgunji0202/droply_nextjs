"use client"
import {useForm} from "react-hook-form"
import { useSignUp } from "@clerk/nextjs"
import {z} from "zod"

import { signUpSchema } from "@/schemas/signUpSchema"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import {Card,CardBody, CardHeader} from "@heroui/card"


export default async function SignUpForm() {
    const[verifying,setVerifying]= useState(false);
    const[isSubmitting,setIsSubmitting]= useState(false);
    const[verficationCode,setVerificationCode]= useState("");
    const[authError,setAuthError]= useState<string | null>(null);
    const[verificationError,setVerificationError]= useState<string | null>(null);
    const router = useRouter();

    const {isLoaded, signUp,setActive} = useSignUp();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });
    const onSubmit= async(data:z.infer<typeof signUpSchema>)=>{
        if(!isLoaded)return;
        setIsSubmitting(true);
        setAuthError(null);
        try{
            const result = await signUp.create({
                emailAddress: data.email,
                password: data.password
            });
            await result.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerifying(true);
        }catch(error:any){
            console.log(error);
            setAuthError(error.errors?.[0]?.message ?? "An Error Occured during the sign up process");
        }finally{
            setIsSubmitting(false);
        }
    }
    const handleVerficationSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!isLoaded|| !signUp) return;
        setIsSubmitting(true);
        setAuthError(null);

        try{
            const result = await signUp.attemptEmailAddressVerification({
                code: verficationCode,
            })
            //Todo: Console result
            if(result.status === "complete"){
                await setActive({session: result.createdSessionId});

                router.push("/dashboard");
            }
            else{
                console.log("Verification Failed",result); 
                setVerificationError("Verification could not completed");
            }

        }
        catch(error:any){
            console.log("Verification Failed",error);
            setVerificationError(error.errors?.[0]?.message ?? "An Error Occured during the sign up process");
        }
        finally{
            setIsSubmitting(false);
        }
        
    }

    if(verifying){
        return(
            <Card className="w-full max-w-md border border-gray-200 bg-default-50 shadow-xl">
                <CardHeader className="flex flex-col gap-1 items-center pb-2">
                    <h1 className="text-2xl font-bold text-default-600">Verify your email</h1>
                    <p className="text-default-400 text-center">Enter the verification code sent to your email</p><p className="text-default-400 text-center"></p>

                </CardHeader>
                <Divider/>
                <CardBody className="py-6">
                    {verificationError && (<div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{verificationError}</p>
                    </div>)}

                </CardBody>

            </Card>

        )
    }
    return(<h1>This is Sign Up with email</h1>)


    
}
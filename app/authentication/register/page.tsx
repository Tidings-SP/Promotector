"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { NEVER, never, z } from "zod"
import { registerSchema } from "../../validators/auth-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { redirect, useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"

async function addr(pin: any) {
    const data = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    return await data.json()
}

type Input = z.infer<typeof registerSchema>;

export default function Register() {
    const { toast } = useToast()
    const router = useRouter()


    const form = useForm<Input>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
  
    const password = form.watch("password", "");
    const confirmPassword = form.watch("confirmPassword", "");

    useEffect(() => {
        console.log(password + ":" + confirmPassword)
        if (password !== confirmPassword) {
            // Set error if passwords don't match
            form.setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            // Clear error if passwords match
            form.clearErrors("confirmPassword");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);
  


    function onSubmit(data: Input) {
        if (data.confirmPassword !== data.password) {
            toast(
                {
                    title: "Password do not match!",
                    variant: "destructive",
                }
            )

            return;
        }
      
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async () => {
                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {
                        displayName: data.name,
                    })


                    await setDoc(doc(db, "user", auth.currentUser.uid), {
                        username: data.name,
                        useremail: data.email,
                        access: false,
                      
                    });

                }

                signInWithEmailAndPassword(auth, data.email, data.password)
                    .then(() => {


                        toast(
                            {
                                title: "Account created successfully!",
                            }
                        )
                        router.push('/home')
                    })
                    .catch((error) => {
                        toast(
                            {
                                title: "Something went wrong:(",
                                variant: "destructive",
                            });
                    })
            })
            .catch((error) => {
                toast(
                    {
                        title: "Something went wrong:(",
                        variant: "destructive",
                    });
            });

    }
   

    return (
        <main className="flex item-centre justify-center">
                
                <Card className="w-[400px] ">
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>Find the best Accommodation here!

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2 gap-4">
                                <div className="space-y-2">


                                    {/* Name */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-neutral">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        onKeyDown={(event) => {
                                                            const inputElement = event.target as HTMLInputElement;
                                                            const key = event.key;
                                    
                                                            if (inputElement.selectionStart) {
                                                              const prevChar = inputElement.value[inputElement.selectionStart - 1];
                                                              const nextChar = inputElement.value[inputElement.selectionStart];
                                                              if (key === " " && (prevChar === " " || nextChar === " ")) {
                                                                event.preventDefault();
                                                              }
                                                            }
                                                            // Allow arrow keys and backspace
                                                            if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown" || key === "Backspace") {
                                                              return;
                                                            }
                                                            // Only allow alphabetical characters and single spaces
                                                            if (!/^[a-zA-Z\s]$/.test(key)) {
                                                              event.preventDefault();
                                                            }
                                                          }}
                                                        placeholder="Enter your name..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-neutral">Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                 

                                </div>

                                <div className="space-y-2">

                                    {/* Password */}
                                    <FormField
                                        control={form.control}

                                        name="password"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel className="text-neutral">New Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your password..." type="password" tabIndex={-1} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Confirm Password */}
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-neutral">Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Please verify your password..." type="password" tabIndex={-1} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                               


                                </div>

                                <div className="space-y-2">
                                    <Button variant={"link"} type="button"
                                        onClick={() => router.push("/authentication/signin")}
                                    >← Login</Button>
                                    <Button type="submit" className="mt-4 float-right px-10">Submit</Button>
                                </div>


                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <Toaster />
            

          
        </main>



    )
}
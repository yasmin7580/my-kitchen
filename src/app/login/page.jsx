"use client"

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,  
    TextField
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {

    const router = useRouter();

    const onSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        })

        if (data) {
            router.push('/')
        }

        if (error) {
            alert(error.message || "Login failed")
        }
    }

    const handleGoogleSignIn = async () => {

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        })

        if (error) {
            alert(error.message || "Google login failed")
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-100">

            <div className="w-full max-w-md">

                {/* Title */}
                <div className="text-center font-semibold text-2xl sm:text-3xl mb-6">

                    <h1 className="mt-2">
                        Login
                    </h1>
                </div>

                {/* Card */}
                <Card className="border border-cyan-400 p-5 sm:p-7 shadow-lg">

                    {/* Form */}
                    <Form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-5"
                    >

                        {/* Email */}
                        <TextField
                            isRequired
                            name="email"




                            type="email"
                            validate={(value) => {

                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }

                                return null;
                            }}
                        >

                            <Label>Email</Label>

                            <Input
                                placeholder="john@example.com"
                                className={'w-full'}
                            />

                            <FieldError />

                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {



                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }

                                return null;
                            }}
                        >



                            <Label>Password</Label>

                            <Input
                                placeholder="Enter your password"
                                className={'w-full'}
                            />

                            <Description>
                                Must be at least 8 characters with 1 uppercase and 1 number
                            </Description>

                            <FieldError />



                        </TextField>

                        {/* Submit */}
                        <div className="flex justify-center gap-2 w-full">

                            <Button
                                className={"w-full"}
                                type="submit"
                            >
                                Login
                            </Button>

                        </div>

                    </Form>





                    {/* Divider */}
                    <div className="space-y-4 mt-5">

                        <p className="text-center p-2 text-black rounded-full border-2 border-cyan-400 text-sm sm:text-base">
                            Or Sign in with
                        </p>

                        {/* Google */}
                        <Button
                            onClick={handleGoogleSignIn}
                            className={'w-full bg-cyan-500'}
                        >

                            <FcGoogle size={22} />

                            Sign in with Google

                        </Button>



                    </div>

                    {/* Register */}
                    <h1 className="text-center text-gray-500 mt-5 text-sm sm:text-base">

                        Don&apos;t have an account ?

                        <Link
                            className="text-cyan-500 ml-1"
                            href={"/register"}
                        >
                            Register
                        </Link>



                    </h1>

                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
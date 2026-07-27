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
import { Eye, EyeClosed, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const [visiblePass, setVisiblePass] = useState(false)

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
                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div>

                                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-[#00d3f2]">
                                    <Mail size={20} className="text-gray-400" />
                                    <input name="password" type={visiblePass ? "text" : "password"} placeholder="Enter your password" className="w-full px-3 py-3 outline-none text-gray-500" />
                                    <button type="button" onClick={() => setVisiblePass(!visiblePass)}>

                                        {visiblePass ? <Eye color='#808080' /> :
                                            <EyeClosed color='#808080' />}
                                    </button>
                                </div>
                            </div>
                        </div>

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
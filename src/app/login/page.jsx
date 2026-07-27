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
        <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f7f6ef] px-4 py-10 sm:px-6">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#d7edc8] blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#ffe1c9] blur-3xl" />

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#dfe5d9] bg-white shadow-2xl shadow-[#35502c]/10 lg:grid-cols-[0.9fr_1.1fr]">
                <aside className="relative hidden overflow-hidden bg-[#1f2f17] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-[#70a84d]/30" />
                    <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[28px] border-[#b65313]/30" />
                    <div className="relative">
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-[#d8efc8]">MY KITCHEN</span>
                        <h1 className="mt-8 text-4xl font-bold leading-tight">Good food starts with a good idea.</h1>
                        <p className="mt-5 max-w-sm leading-7 text-[#d1dfc9]">Sign in to share your kitchen stories, save recipes, and discover something delicious.</p>
                    </div>
                    <p className="relative text-sm font-medium text-[#b9d7a7]">Fresh ideas, gathered around your table.</p>
                </aside>

                <section className="p-6 sm:p-10 lg:p-12">
                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#b65313]">Welcome back</p>
                        <h2 className="mt-2 text-3xl font-bold text-[#1f2f17]">Sign in to your account</h2>
                        <p className="mt-2 text-[#63705c]">Continue your cooking journey with My Kitchen.</p>
                    </div>

                    <Card className="border-0 bg-transparent p-0 shadow-none">
                        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
                            <TextField isRequired name="email" type="email" validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Please enter a valid email address";
                                return null;
                            }}>
                                <Label className="mb-2 font-bold text-[#304326]">Email address</Label>
                                <Input placeholder="you@example.com" className="w-full rounded-xl border border-[#d6ddd0] bg-white text-[#1f2f17] shadow-none focus-within:border-[#54920f]" />
                                <FieldError className="text-[#b65313]" />
                            </TextField>

                            <div className="w-full">
                                <label className="mb-2 block text-sm font-bold text-[#304326]">Password</label>
                                <div className="flex items-center rounded-xl border border-[#d6ddd0] bg-white px-4 transition focus-within:border-[#54920f] focus-within:ring-4 focus-within:ring-[#54920f]/10">
                                    <Mail size={19} className="text-[#54920f]" />
                                    <input name="password" type={visiblePass ? "text" : "password"} placeholder="Enter your password" className="w-full bg-transparent px-3 py-3.5 text-[#1f2f17] outline-none placeholder:text-[#9ba694]" />
                                    <button type="button" onClick={() => setVisiblePass(!visiblePass)} className="rounded-lg p-1 text-[#63705c] transition hover:bg-[#eff7e9] hover:text-[#447a0c]" aria-label={visiblePass ? "Hide password" : "Show password"}>{visiblePass ? <Eye size={19} /> : <EyeClosed size={19} />}</button>
                                </div>
                            </div>

                            <Button className="mt-1 h-12 w-full rounded-xl bg-[#54920f] font-bold text-white shadow-md shadow-[#54920f]/20 transition hover:bg-[#447a0c]" type="submit">Sign in</Button>
                        </Form>

                        <div className="my-7 flex items-center gap-3"><span className="h-px flex-1 bg-[#e3e8df]" /><span className="text-xs font-bold uppercase tracking-wider text-[#899681]">or continue with</span><span className="h-px flex-1 bg-[#e3e8df]" /></div>
                        <Button onClick={handleGoogleSignIn} className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-white font-bold text-[#304326] shadow-none transition hover:bg-[#f3f8ef]"><FcGoogle size={21} /> Continue with Google</Button>
                        <p className="mt-7 text-center text-sm text-[#63705c]">New to My Kitchen? <Link className="font-bold text-[#54920f] hover:text-[#b65313] hover:underline" href={"/register"}>Create an account</Link></p>
                    </Card>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;

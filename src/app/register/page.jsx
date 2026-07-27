"use client";
import { authClient } from '@/lib/auth-client';
import { Button, Card, Form } from '@heroui/react';
import axios from 'axios';
import { Eye, EyeClosed, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
    const imgInputRef = useRef()
    const id = useParams()
    console.log(id)
    const router = useRouter()



    const [image, setImage] = useState()

    const [imageUrl, setImageUrl] = useState("")
    const handleImage = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        // formData.append("name of Data", theData)
        formData.append("image", file)
        // formData.get("name of Data")
        setImage(formData)


        const url = URL.createObjectURL(formData.get("image")) // convert to url. its need obj
        setImageUrl(url)
    }
    const [visiblePass, setVisiblePass] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form) // entries
        formData.delete("image")


        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY}`, image)
        console.log(data.data.url)
        formData.append("image", data.data.url)

        console.log(process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY)
        const newFormData = Object.fromEntries(formData)


        console.log(newFormData)

        const { data: result, error } = await authClient.signUp.email(newFormData)
        if (!error) {
            router.push("/")
        }


        console.log({ result, error })
    }
    const handleGoogleSignIn = async () => {

        await authClient.signIn.social({
            provider: "google"
        })
    }





    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f7f6ef] px-4 py-10 sm:px-6">
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#d7edc8] blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#ffe1c9] blur-3xl" />
            <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#dfe5d9] bg-white shadow-2xl shadow-[#35502c]/10 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="p-6 sm:p-10 lg:p-12">
                    <div className="mb-7"><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#b65313]">Join the community</p><h1 className="mt-2 text-3xl font-bold text-[#1f2f17]">Create your account</h1><p className="mt-2 text-[#63705c]">Share your favorite dishes and keep every recipe close at hand.</p></div>
                    <Card className="border-0 bg-transparent p-0 shadow-none">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[#bad1aa] bg-[#f6faf3] p-4">
                                <input onChange={handleImage} ref={imgInputRef} type="file" id="image" name="image" accept="image/*" className="sr-only" />
                                <button type="button" onClick={() => imgInputRef.current.click()} className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 ${imageUrl.length === 0 ? "border-dashed border-[#54920f] bg-white" : "border-[#54920f]"}`} aria-label="Choose profile image">
                                    {imageUrl ? <Image src={imageUrl} alt="Profile preview" fill className="object-cover" /> : <Plus size={26} className="text-[#54920f]" />}
                                </button>
                                <div><p className="font-bold text-[#304326]">Add a profile photo</p><p className="mt-1 text-sm text-[#63705c]">Optional, but it helps the community know you.</p></div>
                            </div>
                            <div><label className="mb-2 block text-sm font-bold text-[#304326]">Full name</label><input type="text" name="name" placeholder="Enter your name" className="w-full rounded-xl border border-[#d6ddd0] px-4 py-3 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /><p className="mt-1 text-sm text-red-500"></p></div>
                            <div><label className="mb-2 block text-sm font-bold text-[#304326]">Email address</label><input type="email" name="email" placeholder="you@example.com" className="w-full rounded-xl border border-[#d6ddd0] px-4 py-3 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></div>
                            <div><label className="mb-2 block text-sm font-bold text-[#304326]">Password</label><div className="flex items-center rounded-xl border border-[#d6ddd0] px-4 transition focus-within:border-[#54920f] focus-within:ring-4 focus-within:ring-[#54920f]/10"><Mail size={19} className="text-[#54920f]" /><input name="password" type={visiblePass ? "text" : "password"} placeholder="Create a password" className="w-full px-3 py-3 text-[#1f2f17] outline-none placeholder:text-[#9ba694]" /><button type="button" onClick={() => setVisiblePass(!visiblePass)} className="rounded-lg p-1 text-[#63705c] transition hover:bg-[#eff7e9] hover:text-[#447a0c]" aria-label={visiblePass ? "Hide password" : "Show password"}>{visiblePass ? <Eye size={19} /> : <EyeClosed size={19} />}</button></div></div>
                            <Button type="submit" className="h-12 w-full rounded-xl bg-[#54920f] font-bold text-white shadow-md shadow-[#54920f]/20 transition hover:bg-[#447a0c]">Create account</Button>
                        </form>
                        <div className="my-7 flex items-center gap-3"><span className="h-px flex-1 bg-[#e3e8df]" /><span className="text-xs font-bold uppercase tracking-wider text-[#899681]">or sign up with</span><span className="h-px flex-1 bg-[#e3e8df]" /></div>
                        <button onClick={handleGoogleSignIn} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#d6ddd0] bg-white font-bold text-[#304326] transition hover:bg-[#f3f8ef]"><FcGoogle size={21} /> Continue with Google</button>
                        <p className="mt-7 text-center text-sm text-[#63705c]">Already a member? <Link className="font-bold text-[#54920f] hover:text-[#b65313] hover:underline" href={"/login"}>Sign in</Link></p>
                    </Card>
                </section>
                <aside className="relative hidden overflow-hidden bg-[#35502c] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute -right-20 top-12 h-64 w-64 rounded-full border-[30px] border-[#8ebf6a]/30" /><div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#b65313]/30" />
                    <div className="relative"><span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-[#d8efc8]">MY KITCHEN</span><h2 className="mt-8 text-4xl font-bold leading-tight">Every recipe has a story worth sharing.</h2><p className="mt-5 max-w-sm leading-7 text-[#d1dfc9]">Create your free account and add the meals that make your kitchen feel like home.</p></div>
                    <div className="relative rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"><p className="text-sm font-semibold text-[#d8efc8]">Start your collection</p><p className="mt-1 text-sm leading-6 text-white/80">Save ideas, publish recipes, and find your next favorite meal.</p></div>
                </aside>
            </div>
        </main>
    );
};

// export default RegisterPage;

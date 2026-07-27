"use client"
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import { ChevronDown, LogOut, ShieldPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter()
    const { data: session } = authClient.useSession();

    const user = session?.user;
    const handleSignOut = async (e) => {
        const { token } = await authClient.getAccessToken()
        console.log(token)

        // e.stopPropagation()
        // e.preventDefault()
        // e.stop

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await authClient.signOut()
                setDropdown(false)
                router.push("/login")



            }
        });

    }

    const links = <>
        <li><Link href={'/'} className="font-semibold">Home</Link></li>
        <li><Link href={'/all-recipe'} className="font-semibold">All recipe</Link></li>
        {user && <>
            <li><Link href={'/my-recipe'} className="font-semibold">My Recipe</Link></li>
            <li><Link href={'/add-recipe'} className="font-semibold">Add recipe</Link></li>
        </>}
        <li><Link href={'/contact'} className="font-semibold">Contact</Link></li>
    </>
    return (
        <div>
            <div className="navbar relative z-50 overflow-visible bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Image
                    src="/my-kitchen-logo (2).png"
                    alt='logo-image'
                    width={150}
                    height={50}
                    className='object-cover'

                    />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? (

                            <>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setDropdown((isOpen) => !isOpen)}
                                        aria-expanded={dropdown}
                                        aria-haspopup="menu"
                                        className="flex items-center gap-2 rounded-full border border-[#dfe5d9] bg-white py-1 pl-1 pr-3 text-left shadow-sm transition hover:border-[#54920f] hover:bg-[#f3f8ef] focus:outline-none focus:ring-4 focus:ring-[#54920f]/15"
                                    >
                                        <Avatar className="h-9 w-9 border-2 border-[#54920f]">
                                            <Avatar.Image referrerPolicy="no-referrer" alt="user image" src={user?.image} className="object-cover" />
                                            <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                        <span className="hidden max-w-28 truncate text-sm font-semibold text-[#1f2f17] sm:block">{user?.name ?? "Account"}</span>
                                        <ChevronDown size={16} className={`text-[#54920f] transition-transform ${dropdown ? "rotate-180" : ""}`} />
                                    </button>

                                    {dropdown && (
                                        <div role="menu" className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 overflow-hidden rounded-2xl border border-[#dfe5d9] bg-white p-2 shadow-xl shadow-black/15">
                                            <div className="border-b border-[#edf0e9] px-3 py-3">
                                                <p className="truncate font-bold text-[#1f2f17]">{user?.name ?? "My account"}</p>
                                                <p className="mt-0.5 truncate text-sm text-[#63705c]">{user?.email}</p>
                                            </div>
                                            <Link href="/profile" onClick={() => setDropdown(false)} role="menuitem" className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-[#305120] transition hover:bg-[#eff7e9]">
                                                <ShieldPlus size={18} /> Profile
                                            </Link>
                                            <button type="button" onClick={handleSignOut} role="menuitem" className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-semibold text-[#b65313] transition hover:bg-[#fff1e8]">
                                                <LogOut size={18} /> Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>


                        ) : (

                            <>
                                <div className='flex gap-2'>


                                    <Link
                                        href="/login"
                                        className="border border-cyan-400 text-cyan-400 px-5 py-2 rounded-lg hover:bg-cyan-400 hover:text-white transition"
                                    >
                                        Login
                                    </Link>


                                    <Link
                                        href="/register"
                                        className="bg-cyan-400 text-white px-5 py-2 rounded-lg"
                                    >
                                        Register
                                    </Link>

                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;

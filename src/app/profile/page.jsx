"use client";

import { Avatar } from "@heroui/react";
import { BadgeCheck, Camera, CheckCircle2, ChefHat, Mail, PencilLine, ShieldCheck, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [draft, setDraft] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const formValues = {
    name: draft.name ?? user?.name ?? "",
    image: draft.image ?? user?.image ?? "",
  };

  const hasChanges = formValues.name.trim() !== (user?.name ?? "") || formValues.image.trim() !== (user?.image ?? "");

  const updateField = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    setNotice(null);
  };

  const handleCancel = () => {
    setDraft({});
    setNotice(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = formValues.name.trim();

    if (!name) {
      setNotice({ type: "error", text: "Please enter your display name." });
      return;
    }

    setIsSaving(true);
    setNotice(null);
    try {
      const { error } = await authClient.updateUser({
        name,
        image: formValues.image.trim() || null,
      });
      if (error) throw new Error(error.message || "Unable to update your profile.");
      setNotice({ type: "success", text: "Your profile has been updated." });
    } catch (error) {
      setNotice({ type: "error", text: error.message || "Unable to update your profile. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return <section className="grid min-h-[65vh] place-items-center bg-[#f7f6ef] px-5"><p className="font-semibold text-[#63705c]">Loading your profile...</p></section>;
  }

  if (!user) {
    return (
      <section className="grid min-h-[65vh] place-items-center bg-[#f7f6ef] px-5 text-center">
        <div className="max-w-md rounded-3xl border border-[#dfe5d9] bg-white p-8 shadow-sm">
          <UserRound className="mx-auto text-[#54920f]" size={38} />
          <h1 className="mt-4 text-2xl font-bold text-[#1f2f17]">Sign in to view your profile</h1>
          <p className="mt-2 text-[#63705c]">Your account details are available after you sign in.</p>
          <Link href="/login" className="mt-6 inline-flex rounded-full bg-[#54920f] px-5 py-3 font-bold text-white transition hover:bg-[#447a0c]">Go to login</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen overflow-hidden bg-[#f7f6ef] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#dfe5d9] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#b65313]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff0e6] text-[#b65313]"><ChefHat size={16} /></span> My kitchen account</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#1f2f17] sm:text-4xl">Profile settings</h1>
            <p className="mt-2 max-w-xl leading-6 text-[#63705c]">Manage the details shown alongside the recipes you share with the community.</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cfe2bf] bg-[#eff8e9] px-4 py-2.5 text-sm font-bold text-[#356714]"><ShieldCheck size={17} /> Account protected</div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          <aside className="rounded-3xl border border-[#dfe5d9] bg-white p-6 shadow-sm sm:p-8">
            <div className="relative mx-auto w-fit">
              <Avatar className="h-28 w-28 border-4 border-[#eff7e9] shadow-lg">
                <Avatar.Image referrerPolicy="no-referrer" src={formValues.image || user.image} alt={`${user.name || "User"} profile`} className="object-cover" />
                <Avatar.Fallback className="bg-[#54920f] text-3xl font-bold text-white">{user.name?.charAt(0)?.toUpperCase() || "U"}</Avatar.Fallback>
              </Avatar>
              <span className="absolute bottom-1 right-0 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#b65313] text-white"><Camera size={15} /></span>
            </div>
            <div className="mt-5 text-center">
              <h2 className="text-xl font-bold text-[#1f2f17]">{user.name || "My Kitchen member"}</h2>
              <p className="mt-1 break-all text-sm text-[#63705c]">{user.email}</p>
            </div>
            <div className="mt-7 space-y-3 border-t border-[#edf0e9] pt-6">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f4f8f0] p-3.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#54920f] shadow-sm"><BadgeCheck size={18} /></span><div><p className="text-xs font-bold uppercase tracking-wide text-[#778270]">Membership</p><p className="font-semibold text-[#304326]">Recipe contributor</p></div></div>
              <div className="flex items-center gap-3 rounded-2xl bg-[#fff7f1] p-3.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#b65313] shadow-sm"><Mail size={18} /></span><div><p className="text-xs font-bold uppercase tracking-wide text-[#9a7b65]">Email</p><p className="max-w-[190px] truncate font-semibold text-[#573d2c]">{user.email}</p></div></div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dfe5d9] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#edf0e9] pb-6">
              <div><p className="font-semibold uppercase tracking-[0.14em] text-[#b65313]">Personal details</p><h2 className="mt-2 text-2xl font-bold text-[#1f2f17]">Edit your profile</h2><p className="mt-2 text-sm leading-6 text-[#63705c]">Your email is managed by your sign-in provider and cannot be changed here.</p></div>
              <PencilLine className="shrink-0 text-[#54920f]" size={24} />
            </div>

            {notice && <div role="alert" className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${notice.type === "success" ? "border-[#b9dba5] bg-[#eff8e9] text-[#356714]" : "border-[#f0c3ab] bg-[#fff3ec] text-[#9a4219]"}`}><span className="mt-0.5">{notice.type === "success" ? <CheckCircle2 size={18} /> : <X size={18} />}</span>{notice.text}</div>}

            <div className="mt-7 space-y-5">
              <label className="block"><span className="mb-2 block font-semibold text-[#1f2f17]">Display name</span><div className="relative"><UserRound size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#54920f]" /><input name="name" value={formValues.name} onChange={updateField} maxLength={80} required className="h-12 w-full rounded-xl border border-[#d6ddd0] py-2 pl-11 pr-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" placeholder="Your name" /></div></label>
              <label className="block"><span className="mb-2 block font-semibold text-[#1f2f17]">Email address</span><div className="relative"><Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#778270]" /><input value={user.email || ""} readOnly aria-readonly="true" className="h-12 w-full cursor-not-allowed rounded-xl border border-[#e0e5dc] bg-[#f6f7f4] py-2 pl-11 pr-4 text-[#63705c] outline-none" /></div></label>
              <label className="block"><span className="mb-2 block font-semibold text-[#1f2f17]">Profile image URL <span className="font-normal text-[#778270]">(optional)</span></span><div className="relative"><Camera size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#54920f]" /><input name="image" type="url" value={formValues.image} onChange={updateField} className="h-12 w-full rounded-xl border border-[#d6ddd0] py-2 pl-11 pr-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" placeholder="https://example.com/photo.jpg" /></div><p className="mt-2 text-xs text-[#778270]">Paste a public image link to change your profile picture.</p></label>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#edf0e9] pt-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={handleCancel} disabled={!hasChanges || isSaving} className="rounded-full border border-[#d6ddd0] px-6 py-3 font-bold text-[#52604b] transition hover:border-[#aebba5] hover:bg-[#f3f5f0] disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={!hasChanges || isSaving} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#54920f] px-7 py-3 font-bold text-white shadow-md shadow-[#54920f]/20 transition hover:-translate-y-0.5 hover:bg-[#447a0c] focus:outline-none focus:ring-4 focus:ring-[#54920f]/20 disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle2 size={18} /> {isSaving ? "Updating..." : "Update profile"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

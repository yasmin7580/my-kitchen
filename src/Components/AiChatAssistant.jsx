"use client";

import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const WELCOME_MESSAGE = {
  role: "assistant",
  message: "Hi! I’m the My Kitchen assistant. I can help you find recipes, understand ingredients, or use the site.",
};

export default function AiChatAssistant() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const bottomRef = useRef(null);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const canUseAssistant = Boolean(session?.user?.email) && !isAuthPage;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, suggestions, isOpen]);

  useEffect(() => {
    if (!isOpen || historyLoaded || !canUseAssistant) return;
    fetch("/api/ai-chat")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data.messages) && data.messages.length) setMessages(data.messages);
      })
      .catch(() => {})
      .finally(() => setHistoryLoaded(true));
  }, [isOpen, historyLoaded, canUseAssistant]);

  const sendMessage = async (rawMessage) => {
    const message = rawMessage.trim();
    if (!message || isLoading) return;

    setMessages((current) => [...current, { role: "user", message }]);
    setInput("");
    setSuggestions([]);
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessages((current) => [...current, { role: "assistant", message: data.answer }]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", message: error.message || "I’m sorry, I can’t respond right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canUseAssistant) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] sm:bottom-7 sm:right-7">
      {isOpen && (
        <section aria-label="My Kitchen AI Assistant" className="mb-4 flex h-[min(620px,calc(100svh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-[#dfe5d9] bg-[#f8faf5] shadow-2xl shadow-[#1f2f17]/20">
          <header className="flex items-center justify-between bg-[#1f2f17] px-5 py-4 text-white">
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#54920f]"><Sparkles size={18} /></span><div><h2 className="font-bold">My Kitchen AI</h2><p className="text-xs text-[#d4e6c7]">Recipe help, anytime</p></div></div>
            <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 transition hover:bg-white/15" aria-label="Close AI assistant"><X size={20} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => <div key={`${item.timestamp ?? "message"}-${index}`} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}><p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "rounded-br-md bg-[#54920f] text-white" : "rounded-bl-md border border-[#e1e7dc] bg-white text-[#33412d]"}`}>{item.message}</p></div>)}
            {isLoading && <div className="flex justify-start"><div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-[#e1e7dc] bg-white px-4 py-3" aria-label="Assistant is typing"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#54920f]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#54920f] [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#54920f] [animation-delay:300ms]" /></div></div>}
            {!isLoading && suggestions.length > 0 && <div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="rounded-full border border-[#b8d7a1] bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#447a0c] transition hover:bg-[#eff7e9]">{suggestion}</button>)}</div>}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(input); }} className="flex gap-2 border-t border-[#e1e7dc] bg-white p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} disabled={isLoading} maxLength={1000} placeholder="Ask about recipes..." className="min-w-0 flex-1 rounded-xl border border-[#d6ddd0] px-3 py-2.5 text-sm text-[#1f2f17] outline-none placeholder:text-[#8b9784] focus:border-[#54920f] focus:ring-2 focus:ring-[#54920f]/15 disabled:bg-[#f4f6f1]" />
            <button type="submit" disabled={!input.trim() || isLoading} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#54920f] text-white transition hover:bg-[#447a0c] disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><Send size={18} /></button>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setIsOpen((open) => !open)} className="grid h-14 w-14 place-items-center rounded-full bg-[#54920f] text-white shadow-lg shadow-[#54920f]/35 transition hover:scale-105 hover:bg-[#447a0c] focus:outline-none focus:ring-4 focus:ring-[#54920f]/25" aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}>
        {isOpen ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Sparkles, X, Send, Phone, RotateCcw, ChevronDown, ArrowUpRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: Array<{ label: string; href: string; external?: boolean }>;
  suggestions?: string[];
  contactPrompt?: boolean;
}

const STARTER_QUESTIONS = [
  "What is the difference between grades?",
  "How big is 6+ Suta makhana?",
  "What are the shipping charges?",
  "How do wholesale bulk orders work?",
];

// Dedicated High-Tech AI Bot Icon
function AiBotIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Top Antenna with beacon */}
      <line x1="12" y1="2" x2="12" y2="6" strokeWidth="2" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" stroke="none" />

      {/* Bot Head Chassis */}
      <rect x="3" y="6" width="18" height="14" rx="4" />

      {/* Side Sensor Nodes */}
      <path d="M1 11v4" strokeWidth="2" />
      <path d="M23 11v4" strokeWidth="2" />

      {/* Visor Display Screen */}
      <rect x="6.5" y="9.5" width="11" height="5.5" rx="2" strokeWidth="1.2" />

      {/* Glowing Intelligent Eyes */}
      <circle cx="9.5" cy="12.2" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.2" r="1.25" fill="currentColor" stroke="none" />

      {/* High-tech Speech Grid */}
      <path d="M9 17.2h6" strokeWidth="1.6" />
    </svg>
  );
}

export function FloatingSupport({
  phone = "+91 79797 82185",
  whatsapp = "917979782185",
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! Welcome to **AVRELLE AGRO** 🌾\n\nI am your AI assistant for makhana grades, sizing, bulk supply, and order queries direct from Purnea, Bihar.\n\nHow can I help you today?`,
      suggestions: STARTER_QUESTIONS,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rawNumber = whatsapp.replace(/\D/g, "") || "917979782185";
  const cleanPhone = phone.replace(/\s+/g, "");

  // Auto-dismiss initial tooltip after 8s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  async function handleSend(textToSend?: string) {
    const query = (textToSend ?? input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      if (!res.ok) {
        throw new Error("Unable to connect to assistant");
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        links: data.links,
        suggestions: data.suggestions,
        contactPrompt: data.contactPrompt,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `I'm temporarily having trouble fetching that info. Please reach our team directly at **${phone}** (Call or WhatsApp) or email **averelleagro@gmail.com**.`,
          contactPrompt: true,
          links: [
            { label: `Call ${phone}`, href: `tel:${cleanPhone}` },
            { label: "WhatsApp Us", href: `https://wa.me/${rawNumber}`, external: true },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: `Conversation restarted. How can I help you with AVRELLE AGRO makhana today?`,
        suggestions: STARTER_QUESTIONS,
      },
    ]);
  }

  // Basic formatting helper for bold and bullets
  function renderFormattedContent(content: string) {
    return content.split("\n").map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-2" />;

      // Convert **text** to <strong>
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-forest-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 pl-1">
            <span className="text-gold-600 font-bold">•</span>
            <span className="flex-1">{renderedParts}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1">
          {renderedParts}
        </p>
      );
    });
  }

  return (
    <>
      {/* WhatsApp Floating Button (Stays on Bottom-Right) */}
      {!isOpen && (
        <aside
          aria-label="WhatsApp Support"
          className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6"
        >
          <a
            id="whatsapp-float-btn"
            href={`https://wa.me/${rawNumber}?text=${encodeURIComponent(
              "Hello AVRELLE AGRO, I would like to know more about your makhana.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-13 sm:w-13"
            aria-label="Chat with AVRELLE AGRO on WhatsApp"
          >
            {/* WhatsApp SVG Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.76 1.45 5.32L2 22l4.98-1.6a9.8 9.8 0 0 0 5.06 1.4c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.86a8 8 0 0 1-4.34-1.28l-.32-.2-2.95.95.96-2.88-.2-.33a7.97 7.97 0 0 1-1.23-4.28c0-4.44 3.62-8.06 8.08-8.06s8.06 3.62 8.06 8.06-3.62 8.02-8.06 8.02Zm4.44-5.98c-.24-.12-1.44-.72-1.66-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            <span className="pointer-events-none absolute right-full mr-2.5 hidden whitespace-nowrap rounded bg-forest-950/90 px-2.5 py-1 text-[11px] font-medium text-ivory-100 opacity-0 shadow transition-opacity group-hover:opacity-100 sm:block">
              WhatsApp Us
            </span>
          </a>
        </aside>
      )}

      {/* AI Chatbot Floating Trigger: Stacked on mobile (bottom-20 right-4), Left side on desktop (sm:bottom-6 sm:left-8 md:left-9 sm:right-auto) */}
      <aside
        aria-label="AI Assistant"
        className="fixed z-40 bottom-20 right-4 sm:bottom-6 sm:left-8 md:left-9 sm:right-auto"
      >
        {/* First visit greeting tooltip */}
        {!isOpen && showTooltip && (
          <div className="absolute bottom-full mb-3 w-60 rounded-xl border border-gold-500/40 bg-forest-900 p-3 text-ivory-100 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 right-0 sm:right-auto sm:left-0">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-ivory-100/60 hover:text-ivory-100 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-gold-400">
              <AiBotIcon className="h-4 w-4" />
              <span>Avrelle AI Bot</span>
            </div>
            <p className="mt-1 text-[12px] leading-snug text-ivory-100/90">
              Ask about makhana grades, sizes, shipping rates, or bulk supply!
            </p>
          </div>
        )}

        <button
          id="open-chat-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="group relative inline-flex h-13 w-13 items-center justify-center rounded-full border-2 border-gold-400 bg-forest-900 text-ivory-100 shadow-luxe-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 sm:h-14 sm:w-14 cursor-pointer"
          aria-label={isOpen ? "Close AI Chatbot" : "Open AI Makhana Assistant"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gold-300" />
          ) : (
            <div className="relative flex items-center justify-center text-gold-400 transition-colors group-hover:text-gold-300">
              <AiBotIcon className="h-7 w-7" />
              {/* Glowing High-Tech AI Badge */}
              <span className="absolute -top-2.5 -right-2.5 flex items-center gap-0.5 rounded-full border border-forest-950 bg-gradient-to-r from-gold-400 to-gold-500 px-1.5 py-0.5 text-[8.5px] font-black tracking-widest text-forest-950 shadow-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                AI
              </span>
            </div>
          )}
          {/* Tooltip Label: on right of button on desktop */}
          <span className="pointer-events-none absolute hidden whitespace-nowrap rounded border border-gold-500/30 bg-forest-950/95 px-2.5 py-1 text-[11px] font-medium text-ivory-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block right-full mr-2.5 sm:right-auto sm:left-full sm:mr-0 sm:ml-2.5">
            {isOpen ? "Close Assistant" : "Ask Avrelle AI Bot"}
          </span>
        </button>
      </aside>

      {/* AI Chat Window Modal / Bottom Sheet: anchored to the LEFT on desktop */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-forest-950/40 backdrop-blur-xs sm:hidden"
            aria-hidden="true"
          />

          <div
            className="fixed z-50 flex flex-col overflow-hidden border border-gold-500/40 bg-ivory-50 shadow-2xl transition-all duration-300 
                       inset-x-3 bottom-3 top-20 rounded-2xl 
                       sm:inset-auto sm:bottom-22 sm:left-8 md:left-9 sm:right-auto sm:h-[550px] sm:w-[415px] sm:rounded-2xl"
            role="dialog"
            aria-label="Avrelle AI Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold-500/30 bg-forest-900 px-4 py-3.5 text-ivory-100">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-forest-950 text-gold-400 shadow-inner">
                  <AiBotIcon className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-forest-900 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-[15px] font-semibold tracking-wide text-ivory-50 flex items-center gap-1.5">
                    Avrelle AI Assistant
                    <span className="rounded bg-gold-400/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                      Bot
                    </span>
                  </h3>
                  <p className="text-[10px] tracking-wider text-gold-400 uppercase">
                    Makhana & Grade Specialist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Direct Call Icon */}
                <a
                  href={`tel:${cleanPhone}`}
                  title={`Call ${phone}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ivory-100/80 transition-colors hover:bg-forest-800 hover:text-gold-300"
                  aria-label="Call business"
                >
                  <Phone className="h-4 w-4" />
                </a>

                {/* Reset Chat */}
                <button
                  onClick={handleReset}
                  title="Restart conversation"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ivory-100/80 transition-colors hover:bg-forest-800 hover:text-gold-300"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ivory-100/80 transition-colors hover:bg-forest-800 hover:text-gold-300"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex items-center justify-between border-b border-beige-200 bg-beige-100/80 px-3.5 py-1.5 text-[11px] text-ink-700">
              <span className="font-medium">Direct Support:</span>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-1 font-semibold text-forest-800 hover:text-gold-700"
                >
                  <Phone className="h-3 w-3 text-gold-600" />
                  {phone}
                </a>
                <span className="text-beige-300">|</span>
                <a
                  href={`https://wa.me/${rawNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13.5px] leading-relaxed">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-900 border border-gold-500/40 text-gold-400 mt-1 shadow-xs">
                      <AiBotIcon className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div className={`flex flex-col ${m.role === "user" ? "items-end max-w-[88%]" : "items-start max-w-[85%]"}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 shadow-xs ${
                        m.role === "user"
                          ? "bg-forest-800 text-ivory-100 rounded-br-xs"
                          : "border border-beige-200 bg-white text-ink-800 rounded-bl-xs"
                      }`}
                    >
                      {renderFormattedContent(m.content)}

                    {/* Action Links in Assistant Bubble */}
                    {m.links && m.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-beige-100">
                        {m.links.map((link, lIdx) =>
                          link.external || link.href.startsWith("tel:") ? (
                            <a
                              key={lIdx}
                              href={link.href}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center gap-1 rounded border border-gold-500/40 bg-gold-50 px-2.5 py-1 text-[11.5px] font-semibold text-gold-800 hover:bg-gold-100 transition-colors"
                            >
                              {link.label}
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link
                              key={lIdx}
                              href={link.href}
                              onClick={() => {
                                if (window.innerWidth < 640) setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1 rounded border border-forest-800/30 bg-forest-50 px-2.5 py-1 text-[11.5px] font-semibold text-forest-800 hover:bg-forest-100 transition-colors"
                            >
                              {link.label}
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* Contact Prompt Highlight */}
                  {m.contactPrompt && (
                    <div className="mt-2 w-[88%] rounded-xl border border-gold-500/40 bg-gold-50/80 p-2.5 text-center text-[12px] text-ink-800 shadow-xs">
                      <p className="font-semibold text-forest-900">
                        Speak with our Purnea team:
                      </p>
                      <div className="mt-2 flex justify-center gap-2">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="btn-gold !py-1.5 !px-3 !text-[11px]"
                        >
                          Call {phone}
                        </a>
                        <a
                          href={`https://wa.me/${rawNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-gold !py-1.5 !px-3 !text-[11px]"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(s)}
                          disabled={loading}
                          className="rounded-full border border-beige-300 bg-ivory-100 px-3 py-1 text-[11px] font-medium text-forest-900 hover:border-gold-500 hover:bg-gold-50 transition-colors disabled:opacity-50 text-left"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  </div>
                </div>
              ))}

              {/* Typing loader */}
              {loading && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-beige-200 bg-white px-4 py-3 text-ink-500 w-fit">
                  <span className="h-2 w-2 rounded-full bg-gold-500 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-beige-200 bg-white p-2.5 sm:p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about grades, sizes, orders..."
                  className="field !py-2 !text-[13px] flex-1"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="btn-primary !p-2.5 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-ink-400">
                <span>Direct website answers</span>
                <span>Support: {phone}</span>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot as BotIcon,
  LoaderCircle,
  MessageSquareMore,
  Send,
  Settings,
  Sparkles,
  SunMoon,
} from "lucide-react";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isBooting, setIsBooting] = useState(true);
  const messagesEndRef = useRef(null);

  const isDark = theme === "dark";

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const buildMessage = (text, sender) => ({
    id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    sender,
    timestamp: formatTime(new Date()),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSendMessage = async (event) => {
    event?.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4002/bot/v1/message", {
        text: trimmedInput,
      });

      if (res.status === 200) {
        const nextMessages = [
          buildMessage(res.data.userMessage || trimmedInput, "user"),
          buildMessage(res.data.botMessage || "I’m ready to help with that.", "bot"),
        ];

        setMessages((prev) => [...prev, ...nextMessages]);
        setInput("");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        buildMessage("The connection slipped. Please try again in a moment.", "bot"),
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.22),_transparent_35%),#020617]"
          >
            <div className="flex flex-col items-center rounded-[28px] border border-white/10 bg-slate-900/70 px-8 py-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/20">
                <BotIcon size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white">Preparing your assistant</h2>
              <p className="mt-2 text-sm text-slate-400">Booting up the experience for you...</p>
              <div className="mt-5 flex items-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-2.5 w-2.5 rounded-full bg-rose-500"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.12 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
      className={`min-h-screen overflow-hidden px-3 py-4 transition-colors duration-300 sm:px-6 lg:px-8 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%),#040816] text-slate-100"
          : "bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.14),_transparent_30%),#fdf2f8] text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute left-[-4rem] top-12 h-44 w-44 rounded-full blur-3xl ${isDark ? "bg-red-500/20" : "bg-rose-400/20"}`} />
        <div className={`absolute bottom-8 right-[-2rem] h-56 w-56 rounded-full blur-3xl ${isDark ? "bg-fuchsia-500/20" : "bg-pink-400/20"}`} />
        <div className={`absolute left-1/3 top-1/4 h-24 w-24 rounded-full blur-2xl ${isDark ? "bg-orange-500/10" : "bg-orange-300/20"}`} />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`overflow-hidden rounded-[28px] border shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-2xl ${
            isDark
              ? "border-white/10 bg-slate-900/70"
              : "border-slate-200/80 bg-white/80"
          }`}
        >
          <header className={`flex items-center justify-between border-b px-4 py-4 sm:px-6 ${isDark ? "border-white/10" : "border-slate-200/70"}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/20">
                <BotIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold tracking-tight">Nexa Chat</h1>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.24em] ${isDark ? "bg-emerald-500/15 text-emerald-300" : "bg-emerald-500/10 text-emerald-700"}`}>
                    Online
                  </span>
                </div>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Intelligence at Your Fingertips
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
                  isDark
                    ? "border-white/10 bg-slate-800/70 text-slate-200"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
                aria-label="Toggle theme"
              >
                <SunMoon size={18} />
              </button>
              <button
                type="button"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 ${
                  isDark
                    ? "border-white/10 bg-slate-800/70 text-slate-200"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
                aria-label="Settings"
              >
                <Settings size={18} />
              </button>
            </div>
          </header>

          <main className="flex flex-col gap-4 p-4 sm:p-6">
            <div
              className={`flex h-[460px] flex-col overflow-hidden rounded-[24px] border p-3 sm:p-4 ${
                isDark
                  ? "border-white/10 bg-slate-950/60"
                  : "border-slate-200/80 bg-slate-50/90"
              }`}
            >
              <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {messages.length === 0 && !loading ? (
                  <div className="flex h-full items-center justify-center px-2 py-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`w-full max-w-xl rounded-[24px] border p-6 text-center shadow-lg ${
                        isDark
                          ? "border-white/10 bg-slate-900/70"
                          : "border-slate-200 bg-white/90"
                      }`}
                    >
                      <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? "bg-rose-500/15 text-rose-300" : "bg-rose-500/10 text-rose-600"}`}>
                        <Sparkles size={22} />
                      </div>
                      <h2 className="text-xl font-semibold">Hello there — what would you like to explore?</h2>
                      <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Ask anything, from quick ideas to polished writing and thoughtful answers.
                      </p>
                      <div className="mt-5 grid gap-2 text-left sm:grid-cols-2">
                        {[
                          "Summarize this article",
                          "Draft a polished email",
                          "Explain this concept simply",
                          "Help me plan my day",
                        ].map((suggestion) => (
                          <div key={suggestion} className={`rounded-2xl border px-3 py-2 text-sm ${isDark ? "border-white/10 bg-slate-800/80 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-700"}`}>
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.24 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[82%] rounded-[20px] px-4 py-3 shadow-sm sm:max-w-[75%] ${msg.sender === "user"
                          ? "bg-gradient-to-br from-rose-500 via-red-500 to-fuchsia-500 text-white"
                          : `${isDark ? "border border-white/10 bg-slate-800/90 text-slate-100" : "border border-slate-200 bg-white text-slate-800"}`
                        }`}>
                          <p className="whitespace-pre-wrap text-sm leading-6">{msg.text}</p>
                          <p className={`mt-2 text-[11px] ${msg.sender === "user" ? "text-blue-100" : isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className={`rounded-[20px] border px-4 py-3 ${isDark ? "border-white/10 bg-slate-800/90" : "border-slate-200 bg-white"}`}>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <LoaderCircle size={16} className="animate-spin text-rose-500" />
                        <span className={isDark ? "text-slate-300" : "text-slate-600"}>Nova is thinking</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-300"}`}
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSendMessage} className={`rounded-[24px] border px-3 py-3 shadow-inner ${isDark ? "border-white/10 bg-slate-950/70" : "border-slate-200 bg-white/90"}`}>
              <div className="flex items-center gap-2">
                <div className={`flex flex-1 items-center rounded-[18px] border px-3 py-2.5 ${isDark ? "border-white/10 bg-slate-900/80" : "border-slate-200 bg-slate-50"}`}>
                  <MessageSquareMore size={18} className={isDark ? "mr-2 text-slate-400" : "mr-2 text-slate-500"} />
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSendMessage(event);
                      }
                    }}
                    placeholder="Ask me anything..."
                    className={`flex-1 bg-transparent text-sm outline-none placeholder:text-sm ${isDark ? "text-slate-100 placeholder:text-slate-500" : "text-slate-800 placeholder:text-slate-400"}`}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  disabled={loading || !input.trim()}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {loading ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
                </motion.button>
              </div>
            </form>
          </main>
        </motion.div>
      </div>
    </div>
    </>
  );
}

export default Bot;
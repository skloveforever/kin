import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User, RefreshCw, Copy, Check, MessageSquare } from "lucide-react";
import Markdown from "react-markdown";
import { EdieMessage } from "../types";
import { playUiSound } from "../utils/audio";

export const EdieAiSandbox: React.FC = () => {
  const [messages, setMessages] = useState<EdieMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      text: "Greetings. I am **EDIE** — COMIWAY's Empathic Digital Intelligence Engine. I assist exclusively with COMIWAY's strategy, custom AI CX, and growth solutions. For partnerships, collaborations, or inquiries, reach out to us at **connect@comiway.com**. How can I help you explore COMIWAY today?",
      timestamp: "Just now",
      suggestions: [
        "Explain COMIWAY's 4 Core Pillars",
        "How does EDIE AI integrate into CX?",
        "Partnership inquiries (connect@comiway.com)",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    playUiSound("click");

    const userMsg: EdieMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

      const res = await fetch("/api/edie-ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: historyPayload,
        }),
      });

      const data = await res.json();
      playUiSound("ai");

      const assistantMsg: EdieMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.reply || "Architectural analysis complete. How else can EDIE guide your growth strategy?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: data.suggestions || [
          "Generate a 90-day growth roadmap",
          "Inspect website 3D performance",
          "Book a studio architecture sprint",
        ],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Error communicating with EDIE AI:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "EDIE is synchronizing high-density network clusters. Please ask any questions regarding COMIWAY's core pillars, custom AI workflows, or contact connect@comiway.com for direct collaborations.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playUiSound("click");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="edie-ai-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <Bot className="w-3.5 h-3.5" /> COMIWAY.AI & EDIE EMPATHIC INTELLIGENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            MEET EDIE <span className="text-purple-400">AI</span> ARCHITECT
          </h2>
          <p className="text-slate-300 font-light text-base sm:text-lg mt-2">
            Experience COMIWAY&apos;s proprietary empathic neural agent for strategy, brand architecture, and custom CX automation.
          </p>
        </div>

        {/* Chat Sandbox Window */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl shadow-purple-950/20 overflow-hidden flex flex-col h-[600px] backdrop-blur-2xl relative">
          {/* Top Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-purple-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  EDIE v2.4 <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">GEMINI POWERED</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">Empathic Digital Intelligence Engine</div>
              </div>
            </div>

            <button
              onClick={() => {
                playUiSound("click");
                setMessages([
                  {
                    id: `reset-${Date.now()}`,
                    role: "assistant",
                    text: "Conversation reset. What new strategic vector should we explore?",
                    timestamp: "Just now",
                  },
                ]);
              }}
              title="Reset Conversation"
              className="p-2 rounded-xl bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Messages Feed */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[88%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.role === "user"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-purple-900/60 border border-purple-500/40 text-purple-300"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none font-medium"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {m.role === "user" ? (
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    ) : (
                      <div className="text-sm leading-relaxed space-y-2">
                        <Markdown
                          components={{
                            strong: ({ children }) => (
                              <strong className="font-bold text-purple-300 bg-purple-950/40 px-1 py-0.5 rounded border border-purple-500/20">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => <em className="italic text-purple-200">{children}</em>,
                            p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 text-slate-200">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 text-slate-200">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            h1: ({ children }) => <h1 className="text-base font-bold text-purple-300 border-b border-slate-800 pb-1 mt-3 mb-1.5">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold text-purple-300 mt-2 mb-1">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold text-purple-300 mt-2 mb-1">{children}</h3>,
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold underline hover:text-emerald-300 transition-colors">
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-slate-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-800">
                                {children}
                              </code>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-purple-400 pl-3 italic text-slate-400 my-2">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {m.text}
                        </Markdown>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-slate-800/40 text-[10px] font-mono text-slate-400">
                      <span>{m.timestamp}</span>
                      {m.role === "assistant" && (
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                        >
                          {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedId === m.id ? "Copied" : "Copy"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Suggestions Pills */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {m.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => handleSendMessage(sug)}
                          className="px-3 py-1 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-mono transition-colors text-left"
                        >
                          → {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-purple-400 text-xs font-mono p-4 rounded-2xl bg-slate-900/60 border border-slate-800 w-fit">
                <Sparkles className="w-4 h-4 animate-spin" /> EDIE AI is synthesizing architecture response...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EDIE about COMIWAY services, 4 pillars, or connect@comiway.com..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs uppercase font-mono disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>SEND</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

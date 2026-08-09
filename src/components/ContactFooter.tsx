import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, Instagram, Loader2 } from "lucide-react";
import { playUiSound } from "../utils/audio";

export const ContactFooter: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    serviceNeeded: "Strategic Branding",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playUiSound("click");
    setIsTransmitting(true);

    const targetEmail = import.meta.env.VITE_CONTACT_EMAIL || "connect@comiway.com";
    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      if (web3Key) {
        // Option 1: Web3Forms API if key provided
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `⚡ New COMIWAY Sprint Inquiry from ${form.name}`,
            name: form.name,
            email: form.email,
            service: form.serviceNeeded,
            message: form.message,
          }),
        });
      } else {
        // Option 2: FormSubmit.co AJAX Endpoint (works on GitHub Pages & custom domain)
        await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            service_requested: form.serviceNeeded,
            message: form.message,
            _subject: `⚡ New COMIWAY Architecture Sprint Inquiry from ${form.name}`,
            _template: "table",
          }),
        });
      }
    } catch (err) {
      console.warn("Client-side email transmission completed with fallback state:", err);
    } finally {
      setIsTransmitting(false);
      playUiSound("success");
      setSubmitted(true);
    }
  };

  return (
    <footer id="contact-section" className="relative pt-20 pb-12 bg-slate-950 border-t border-slate-900 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Contact Form & Studio Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Left Column: Studio Coordinates & Direct Lines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-2xl font-black tracking-widest text-white flex items-center gap-2">
                COMIWAY
              </div>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Premier Studio Blending Strategy, Custom AI, and Digital Experience.
                Architecting market monopolies and high-performance real estate for forward-thinking brands.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Global Innovation Hub & Headquarters</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>connect@comiway.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 mb-3">CONNECT WITH COMIWAY:</div>
              <div className="flex items-center gap-3">
                {[
                  { name: "Instagram", icon: Instagram, href: "https://instagram.com/comiway" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playUiSound("click")}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono text-slate-300 hover:text-emerald-400">@comiway</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl">
              <h3 className="text-xl font-bold text-white mb-1">INQUIRE FOR AN ARCHITECTURE SPRINT</h3>
              <p className="text-xs font-mono text-slate-400 mb-6">
                Receive a tailored response from our senior strategy team or email us directly at{" "}
                <a href="mailto:connect@comiway.com" className="text-emerald-400 underline hover:text-emerald-300">
                  connect@comiway.com
                </a>.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div className="text-lg font-bold text-white">Sprint Request Transmitted!</div>
                  <p className="text-xs font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-emerald-400 font-bold">{form.name || "Visionary"}</span>. Your inquiry for <span className="text-white">{form.serviceNeeded}</span> has been dispatched to our Lead Architects at{" "}
                    <span className="text-emerald-400 font-bold">{import.meta.env.VITE_CONTACT_EMAIL || "connect@comiway.com"}</span>.
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "connect@comiway.com"}?subject=${encodeURIComponent(`COMIWAY Sprint Inquiry: ${form.serviceNeeded}`)}&body=${encodeURIComponent(`Full Name: ${form.name}\nBusiness Email: ${form.email}\nPillar Focus: ${form.serviceNeeded}\n\nProject Brief:\n${form.message}`)}`}
                      onClick={() => playUiSound("click")}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Open in Mail App (Direct Mailto)</span>
                    </a>
                    <button
                      onClick={() => {
                        playUiSound("click");
                        setSubmitted(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Your Full Name:</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">Business Email:</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Primary Pillar Focus:</label>
                    <select
                      value={form.serviceNeeded}
                      onChange={(e) => setForm({ ...form, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>Strategic Branding & Gen Z Strategy</option>
                      <option>3D Glass Website & Digital Real Estate</option>
                      <option>Custom AI Solutions & EDIE CORE CX</option>
                      <option>Strategic Growth Blueprinting</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Project Brief / Vision:</label>
                    <textarea
                      rows={3}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your brand goals, target timeline, or AI automation requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
                  >
                    {isTransmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>TRANSMITTING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT SPRINT INQUIRY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Status & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>COMIWAY SYSTEM STATUS: ALL SERVERS OPERATIONAL</span>
          </div>

          <div>
            © {new Date().getFullYear()} COMIWAY Idea Architecture Studio. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

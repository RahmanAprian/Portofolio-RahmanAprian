"use client";
import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";
import { SectionHeader } from "./About";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_xhm9sz8";
const EMAILJS_TEMPLATE_ID = "template_jjdq9qz";
const EMAILJS_PUBLIC_KEY = "G6ItjERGIbRMhuZ1Y";

const contactInfo = [
  { icon: FiMail, label: "Email", value: "aprianrahman8@gmail.com", href: "mailto:aprianrahman8@gmail.com" },
  { icon: FiMapPin, label: "Lokasi", value: "Palembang, Indonesia", href: "#" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// contact"
          title="Hubungi Saya"
          subtitle="Ada proyek menarik? Jangan ragu untuk menghubungi saya."
        />

        <div ref={ref} className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <p className="text-muted leading-relaxed">
              Saya terbuka untuk diskusi proyek, kolaborasi, freelance, maupun pertanyaan umum.
              Biasanya saya membalas dalam 24 jam.
            </p>

            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 bg-surface border border-white/8 rounded-xl hover:border-primary/40 transition-colors group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-muted">{label}</div>
                    <div className="text-sm text-white font-medium">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-5 bg-surface border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Tersedia untuk kerja</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Saat ini saya menerima proyek freelance dan terbuka untuk full-time remote.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-3"
          >
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 h-full min-h-[320px] bg-surface border border-green-500/20 rounded-2xl"
              >
                <FiCheckCircle size={48} className="text-green-400" />
                <div className="text-center">
                  <p className="text-white font-medium text-lg">Pesan terkirim!</p>
                  <p className="text-muted text-sm mt-1">Terima kasih, saya akan segera menghubungi kamu.</p>
                </div>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 text-sm text-primary hover:text-primary-light transition-colors"
                >
                  Kirim pesan lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {status === "error" && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
                    Gagal mengirim pesan. Coba lagi beberapa saat.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted">Nama</label>
                    <input
                      required
                      type="text"
                      placeholder="Nama kamu"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="px-4 py-3 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="email@kamu.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="px-4 py-3 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted">Subjek</label>
                  <input
                    required
                    type="text"
                    placeholder="Perihal pesan"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="px-4 py-3 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted">Pesan</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Ceritakan proyekmu..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="px-4 py-3 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light disabled:opacity-60 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 mt-1"
                >
                  {status === "loading" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
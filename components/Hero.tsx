"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiInstagram, FiDownload } from "react-icons/fi";

const socials = [
  { icon: FiGithub, href: "https://github.com/RahmanAprian", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/rahman-aprian-39b6ab279?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://www.instagram.com/rhmn0504?igsh=MTZiNDQ4cXptbmkxdA==", label: "Instagram" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Available for work
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Halo, Saya{" "}
            <span className="text-gradient">Rahman Aprian</span>
          </motion.h1>

          <motion.div variants={item} className="text-xl md:text-2xl font-medium text-muted min-h-[2em]">
            <TypeAnimation
              sequence={[
                "Fullstack Web Developer", 2000,
                "React & Next.js Enthusiast", 2000,
                "UI/UX Passionate", 2000,
                "Problem Solver", 2000,
              ]}
              repeat={Infinity}
              wrapper="span"
              speed={50}
              className="text-primary-light"
            />
          </motion.div>

          <motion.p variants={item} className="text-muted text-base leading-relaxed max-w-md">
            Saya membangun aplikasi web modern yang cepat, indah, dan mudah digunakan.
            Berbasis di Palembang, terbuka untuk proyek remote di seluruh dunia.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Lihat Proyek
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-primary/50 text-white font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact ME
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4 pt-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-muted hover:text-primary hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Avatar side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: "12s" }} />
            {/* Glow */}
            <div className="absolute inset-4 rounded-full bg-primary/10 blur-xl" />
            {/* Avatar image or fallback */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-primary/40 glow-primary">
              <Image
                src="/profile.jpeg"
                alt="Rahman Aprian"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-2 -right-4 bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-accent shadow-lg"
            >
              &lt;Developer /&gt;
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -left-4 bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-primary-light shadow-lg"
            >
              React & Next.js
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

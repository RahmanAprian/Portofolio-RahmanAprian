"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiAlertCircle } from "react-icons/fi";
import {
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiVite,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiMaterialdesign,
  SiBootstrap,
  SiVercel,
} from "react-icons/si";
import { SectionHeader } from "./About";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  github: string;
  demo: string;
  color: string;
};

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    desc: "Platform belanja online full-featured dengan manajemen produk, keranjang, payment gateway Midtrans, dan dashboard admin.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-primary/20 to-accent/10",
  },
  {
    title: "Task Management App",
    desc: "Aplikasi manajemen tugas tim dengan fitur drag-and-drop, real-time update, dan kolaborasi multi-user.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-accent/20 to-purple-500/10",
  },
];

const techStack = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "React", Icon: SiReact },
  { name: "Vite", Icon: SiVite },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "PHP", Icon: SiPhp },
  { name: "MySQL", Icon: SiMysql },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Material UI", Icon: SiMaterialdesign },
  { name: "Bootstrap", Icon: SiBootstrap },
  { name: "Vercel", Icon: SiVercel },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"projects" | "stack">("projects");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// portfolio showcase"
          title="Portfolio Showcase"
          subtitle="Pilih tab untuk melihat proyek saya dan teknologi yang saya gunakan." 
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-2 p-1 shadow-xl shadow-black/20 mb-10">
          <div className="flex flex-col sm:flex-row gap-3 bg-surface rounded-3xl p-2">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`flex-1 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "projects"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiExternalLink size={16} /> Projects
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("stack")}
              className={`flex-1 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "stack"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiGithub size={16} /> Tech Stack
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects"
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-5"
            >
              {projects.map((project, i) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="group relative bg-surface border border-white/8 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-28 bg-gradient-to-br ${project.color}`} />
                  <div className="p-6 flex flex-col gap-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-primary-light/80">Featured Project</div>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-muted hover:text-white transition-colors"
                      >
                        <FiGithub size={14} /> Source
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-primary-light hover:text-white transition-colors"
                      >
                        <FiExternalLink size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="stack"
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {techStack.map(({ name, Icon }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/8 bg-surface p-6 text-center hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-primary-light">
                    <Icon size={28} />
                  </div>
                  <span className="text-sm font-medium text-white">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

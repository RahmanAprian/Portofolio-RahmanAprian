"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";

const skillGroups = [
  {
    category: "Tech Stack",
    color: "from-primary to-primary-light",
    skills: [
      { name: "Laravel", level: 90 },
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Node.js", level: 85 },
    ],
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Laravel", "MySQL", "Supabase", "Firebase", "Vite", "HTML", "CSS", "JavaScript", "PHP", "Bootstrap", "Material Design", "Vercel"
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-white/80">{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-6 bg-surface/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// skills"
          title="Keahlian"
          subtitle="Teknologi dan tools yang saya gunakan sehari-hari untuk membangun produk."
        />

        <div ref={ref} className="flex justify-center mb-14">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className="w-full max-w-4xl bg-surface border border-white/8 rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${group.color}`} />
                <h3 className="text-sm font-medium text-white">{group.category}</h3>
              </div>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    delay={gi * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.04 }}
              className="px-4 py-2 text-sm font-mono bg-surface border border-white/8 text-muted rounded-xl hover:border-primary/40 hover:text-primary-light transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

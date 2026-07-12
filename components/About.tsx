"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FiCode, FiLayers, FiServer, FiStar } from "react-icons/fi";

const traits = [
  { icon: FiCode, title: "Clean Code", desc: "Menulis kode yang mudah dibaca dan di-maintain oleh tim." },
  { icon: FiLayers, title: "UI Focused", desc: "Memastikan tampilan dan pengalaman pengguna selalu jadi prioritas." },
  { icon: FiServer, title: "Fullstack", desc: "Nyaman bekerja di sisi frontend maupun backend sekaligus." },
  { icon: FiStar, title: "Hasil Berkualitas", desc: "Setiap proyek dikerjakan dengan standar tinggi dan tepat waktu." },
];

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="text-xs font-mono text-primary uppercase tracking-widest">{eyebrow}</span>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-3 text-muted max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export { SectionHeader };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="// about me"
          title="Tentang Saya"
          subtitle="Sedikit cerita tentang siapa saya dan mengapa saya suka ngoding."
        />

        <div className="grid md:grid-cols-2 gap-14 items-center" ref={ref}>
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <p className="text-muted leading-relaxed">
              Halo! Saya <strong className="text-white">Rahman Aprian</strong>, seorang Fullstack Web Developer
              asal Palembang, Sumatera Selatan. Saya Mahasiswa Sistem informasi dari kampus UIN Raden Fatah Palembang. Sudah lebih dari 3 tahun saya mendalami pengembangan
              web dari desain UI yang menarik hingga arsitektur backend yang solid.
            </p>
            <p className="text-muted leading-relaxed">
              Saya percaya bahwa website bukan hanya soal kode tapi tentang pengalaman nyata yang
              dirasakan pengguna. Setiap baris kode yang saya tulis bertujuan untuk menciptakan
              produk yang cepat, mudah digunakan, dan scalable.
            </p>
            <p className="text-muted leading-relaxed">
              Ketika tidak ngoding, saya senang eksplorasi teknologi baru, berkontribusi ke open source,
              dan berbagi ilmu lewat tulisan maupun mentoring.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Figma"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary-light border border-primary/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 mt-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              Hubungi saya →
            </a>
          </motion.div>

          {/* Right: traits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {traits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface-2 border border-white/6 rounded-xl p-4 hover:border-primary/30 transition-colors">
                <Icon size={18} className="text-primary mb-2" />
                <div className="text-sm font-medium text-white">{title}</div>
                <div className="text-xs text-muted mt-1 leading-relaxed">{desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

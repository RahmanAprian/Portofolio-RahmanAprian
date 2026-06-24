import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/6 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm">
          <span className="text-white/70">RahmanAprian</span>
          <span className="text-muted ml-3">© {year}</span>
        </div>

        <p className="text-xs text-muted">
          Dibangun dengan Next.js · Tailwind · Framer Motion
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: FiGithub, href: "https://github.com/usernamekamu", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/in/usernamekamu", label: "LinkedIn" },
            { icon: FiInstagram, href: "https://instagram.com/usernamekamu", label: "Instagram" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

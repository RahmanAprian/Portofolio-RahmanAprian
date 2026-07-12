import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobeSection from "@/components/GlobeSection";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg grid-bg">
      {/* Background glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <Navbar />
      <Hero />
      <GlobeSection />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

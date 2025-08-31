
import { ThemeProvider } from '@/components/ui/theme-provider';
import Navigation from '@/components/layout/Navigation';
import ParticleBackground from '@/components/3d/ParticleBackground';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        <ParticleBackground />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="py-8 text-center border-t border-border/50">
          <div className="container mx-auto px-6">
            <p className="text-foreground/60">
              © 2025 Yasir Arafaat. Built with React, Three.js & Framer Motion.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;

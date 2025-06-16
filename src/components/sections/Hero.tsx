
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeInOut
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient opacity-10" />

      {/* Temporary 3D Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-6xl font-bold text-primary/20 animate-pulse">DEV</div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-accent font-medium tracking-wide">Hello, I'm</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
          >
            Yasir Arafaat
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl text-foreground/80 mb-8"
          >
            <span>Full Stack Developer</span>
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            I craft exceptional digital experiences with modern technologies,
            bringing ideas to life through clean code and innovative design.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="glass-card text-primary hover:glow-effect hover:text-primary-foreground transition-all duration-300 group"
              onClick={() => {
                const workSection = document.getElementById('work');
                if (workSection) {
                  workSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <span>View My Work</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                  →
              </motion.div>
            </Button>

            <a 
              href="https://wa.me/917905325078?text=Hi%20Yasir%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%20" 
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button
                variant="outline"
                size="lg"
                className="glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Hire Me
              </Button>
            </a>
          </motion.div>

          {/* Scroll to Explore Button - Below action buttons */}
          <motion.div 
            className="w-full mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col items-center justify-center hover:bg-transparent"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                <span className="text-sm text-foreground/60">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown className="h-6 w-6 text-foreground/60" />
                </motion.div>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

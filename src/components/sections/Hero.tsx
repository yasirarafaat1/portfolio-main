
import { motion } from 'framer-motion';
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
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

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            <a
              href={"https://github.com/yasirarafaat1"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="glass-card hover:glow-effect transition-all duration-300 group"
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
            </a>

            <Button
              variant="outline"
              size="lg"
              className="glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Hire Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-foreground/60 mt-5"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

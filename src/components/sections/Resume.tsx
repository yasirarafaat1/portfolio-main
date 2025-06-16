import { motion, useInView, easeInOut } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeInOut,
      },
    },
  };

  return (
    <section id="resume" className="py-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container mx-auto px-6 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
        >
          My Resume
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8"
        >
          Here you can download my resume to get a more detailed look at my skills and experience.
        </motion.p>
        <motion.div variants={itemVariants}>
          <a href="/Yasir_Arafaat_Resume.pdf" download="Yasir_Arafaat_Resume.pdf">
            <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-[#6164eb] hover:border-[#6164eb] hover:text-primary-foreground transition-colors duration-300">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;

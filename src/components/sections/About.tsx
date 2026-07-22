import { motion, useInView, easeInOut } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';


const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        ease: easeInOut
      }
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Passionate developer with a love for creating beautiful, functional applications
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="lg:sticky top-2 relative">
                <motion.div
                  className="w-80 h-80 mx-auto relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30"></div>
                  <img
                    src="/profile.jpeg"
                    alt="Profile"
                    className="relative w-full h-full object-cover rounded-full border-2 border-primary/20"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-card sm:glass-card border border-border p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  What I've Built
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  I'm currently working with Akamify where I develop full-stack solutions. I've built multiple real-world projects including freelance work and personal applications. My experience spans the complete development cycle - from designing interfaces to deploying production applications. I focus on clean code, performance, and creating applications that actually solve user problems.
                </p>
              </Card>

              <Card className="bg-card sm:glass-card border border-border p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  My Skills
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>React.js, TypeScript, Node.js</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Full-stack Development & Deployment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Database design & API development</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-card sm:glass-card border border-border p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  My Goal
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  I'm passionate about creating apps that are fast, intuitive, and solve real problems. I love learning new technologies and staying updated with industry trends. Every project is an opportunity to improve my skills and deliver quality solutions.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

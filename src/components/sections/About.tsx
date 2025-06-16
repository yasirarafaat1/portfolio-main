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
          animate="visible"
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
              <div className="relative">
                <motion.div
                  className="w-80 h-80 mx-auto relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-30"></div>
                  <img
                    src="/profile.jpeg"
                    alt="Profile"
                    className="relative w-full h-full object-cover rounded-full glass-card"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  My Journey
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Over the past 6 months, I've immersed myself in the world of web development, 
                  transforming my passion into practical skills. My journey includes successfully 
                  delivering a freelance project and building multiple personal projects that solve 
                  real-world problems. I thrive in fast-paced environments where I can apply my 
                  problem-solving skills and continuously learn new technologies. My hands-on 
                  experience has given me valuable insights into the complete development lifecycle, 
                  from concept to deployment.
                </p>
              </Card>

              <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  What I Do
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Full-stack web application development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Modern React & TypeScript development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>UI/UX design and prototyping</span>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Beyond Code
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or enjoying outdoor adventures. 
                  I believe in continuous learning and staying updated with the latest 
                  industry trends.
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

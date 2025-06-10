import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';

const skills = [
  { name: 'React/Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Bootstrap', level: 82, category: 'Library' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'GitHub', level: 85, category: 'Version Control' },
  { name: 'ShadCn', level: 80, category: 'Library' },
  { name: 'Vercel', level: 75, category: 'Deployment' },
  { name: 'Firebase', level: 78, category: 'Firebase' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Skills & Expertise
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                custom={index}
              >
                <Card className="glass-card p-6 hover:glow-effect transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-lg">{skill.name}</span>
                    <span className="text-accent font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-foreground/60 bg-muted/50 px-2 py-1 rounded-full">
                      {skill.category}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

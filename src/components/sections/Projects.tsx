import { motion, useInView, easeInOut } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';



const projects = [
  {
    id: 1,
    title: 'Subhash Academy College Website',
    description: 'A college website with Next.js, ShadCn, Firebase, GitHub, and Vercel. Features include real-time inventory, payment processing, and admin dashboard.',
    image: '/subhash.png',
    tags: ['Next.js', 'Firebase', 'Vercel'],
    github: 'https://github.com/yasirarafaat1/subhash-academy',
    live: 'https://subhashacademy.co.in'
  },
  {
    id: 2,
    title: 'Glow Invoice Creator',
    description: 'Intelligent invoice crator app with mode toggling. Built with React.js,Tailwind, firebase, Vercel.',
    image: '/glow-invoice.png',
    tags: ['React.js', 'TypeScript', 'GitHub', 'Firebase','Vercel'],
    github: 'https://github.com/yasirarafaat1/glow-invoice',
    live: 'https://glow-invoice.vercel.app'
  },
  {
    id: 3,
    title: 'E-Commerce: Kiswah Makkah Store',
    description: 'Interactive 3D portfolio website with Three.js animations and immersive user experience. Showcases advanced web technologies.',
    image: '/kiswah.png',
    tags: ['React', 'Node', 'Supabase', 'Vercel'],
    github: 'https://github.com/faizansiddqui/zaidEcommerceFrontend03-12.git',
    live: 'https://kiswahmakkahstore.com'
  },
  {
    id: 4,
    title: 'SS Public School Website',
    description: 'Modern school website with real-time updation of fees struture, gallery, staff members.',
    image: '/ssps.png',
    tags: ['React.js', 'Firebase', 'GitHub', 'Bootstrap', 'Vercel'],
    github: 'https://github.com/yasirarafaat1/ss-public-school',
    live: 'https://schooldemo.akamify.com'
  },
   {
    id: 5,
    title: 'Mahabali Price Action Portfolio',
    description: 'Price Action Portfolio website with form submission functioanlty AiSensy integration with reminder compaigns.',
    image: '/mahabali.png',
    tags: ['React.js', 'Node.js', 'Google Sheets', 'AiSensy', 'QStash', 'GitHub', 'Vercel'],
    github: 'https://github.com/faizansiddqui/tradinglandingpagebyrahulsir.git',
    live: 'https://mahabalipriceaction.com'
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              My Portfolio
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="perspective-1000"
              >
                <Card className="bg-card sm:glass-card border border-border overflow-hidden group hover:glow-effect transition-all duration-500 transform-style-3d">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-primary">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium bg-muted/50 text-accent px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => project.github === '#' && e.preventDefault()}
                        className={project.github === '#' ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-[#6164eb] hover:border-[#6164eb] hover:text-primary-foreground transition-colors duration-300"
                          disabled={project.github === '#'}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </a>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => project.live === '#' && e.preventDefault()}
                        className={project.live === '#' ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-[#6164eb] hover:border-[#6164eb] hover:text-primary-foreground transition-colors duration-300"
                          disabled={project.live === '#'}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </a>
                    </div>
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

export default Projects;

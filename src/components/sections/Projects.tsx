import { motion, useInView, easeInOut } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';



const projects = [
  {
    id: 5,
    title: 'Mahabali Price Action Portfolio',
    description: 'Price Action Landing Page with form submission functionality with WhatsApp Business API integration with reminder template messages through Qstash.',
    image: '/mahabali.png',
    tags: ['React.js', 'Node.js', 'Razorpay', 'Brevo', 'Google Sheets API', 'WhatsApp Business API', 'QStash'],
    live: 'https://mahabalipriceaction.com'
  },
  {
    id: 7,
    title: 'Digital AdBird CRM',
    description: 'CRM for managing leads, users, teams, partner requests, follow-ups, and performance reports with automated lead assignment, scheduled distribution, call tracking, notifications, and real-time updates using Socket.IO. Integrated Meta lead syncing, WhatsApp chat, Google Sheets synchronization, and secureJWT authentication.',
    image: '/crm.png',
    tags: ['Next.js', 'Node.js', 'Meta Graph APIs', 'Google Sheet API', 'Brevo', 'Virtual Private Server (VPS)', 'MySQL'],
    live: 'https://crm.digitaladbird.com'
  },
  {
    id: 7,
    title: 'Pure Fire E-Commerce Store',
    description: 'A full-stack e-commerce store with real-time inventory with connected google sheets, real time instagram reels fetch using meta graph api, secure payments, and a scalable admin dashboard.',
    image: '/pure-fire.png',
    tags: ['Next.js', 'Node.js', 'Gemini API(Chat Bot)', 'Meta Graph API', 'Google Sheet API', 'Brevo', 'Cloudinary', 'Razorpay', 'MongoDb', 'Vercel'],
    live: 'https://pure-fire.vercel.app'
  },
  {
    id: 1,
    title: 'Apex Thrill | E-commerce',
    description: 'A full-stack e-commerce platform with real-time inventory, secure payments, and a scalable admin dashboard.',
    image: '/www.apexthrill.com.png',
    tags: ['Next.js', 'Node.js', 'MogoDB', 'Cloudinary', 'Brevo', 'Razorpay', 'Shiprocket'],
    live: 'https://www.apexthrill.com'
  },
  {
    id: 2,
    title: 'Amila Gold | E-commerce',
    description: 'A scalable e-commerce application offering smooth user experience, integrated payments, and robust product management.',
    image: '/amilagold.png',
    tags: ['Next.js', 'Node.js', 'MogoDB', 'Cloudinary', 'Brevo', 'Razorpay'],
    live: 'https://jaggery-frontend-drab.vercel.app/'
  },
  {
    id: 3,
    title: 'Subhash Academy College Website',
    description: 'A college website with Next.js, ShadCn, Firebase, GitHub, and Vercel. Features include real-time inventory, payment processing, and admin dashboard.',
    image: '/subhash.png',
    tags: ['Next.js', 'Node.js', 'Firebase'],
    live: 'https://subhashacademy.co.in'
  },
  {
    id: 4,
    title: 'Glow Invoice Creator',
    description: 'Intelligent invoice crator app with mode toggling. Built with React.js, Tailwind, Firebase, and Vercel.',
    image: '/glow-invoice.png',
    tags: ['React.js', 'Node.js', 'Firebase'],
    live: 'https://glow-invoice.vercel.app'
  },
  {
    id: 6,
    title: 'SS Public School Website',
    description: 'Modern school website with real-time updation of fees struture, gallery, staff members.',
    image: '/ssps.png',
    tags: ['React.js', 'Firebase', 'GitHub', 'Bootstrap'],
    live: 'https://schooldemo.akamify.com'
  },
  {
    id: 8,
    title: 'Parenting Guide | Landing Paage',
    description: 'A parenting-focused landing page with lead capture and WhatsApp Business API integration with messages scheduling using Qstash.',
    image: '/parentingguide.com.png',
    tags: ['Next.js', 'Node.js', 'Google Sheet API', 'WhatsApp Business API', 'Vercel'],
    live: 'https://parentingguide.com'
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
                      className="w-full h-68 object-cover transition-transform duration-500 group-hover:scale-110"
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

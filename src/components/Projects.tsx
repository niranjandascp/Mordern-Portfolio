import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured modern e-commerce application built with Next.js, Stripe integration, and Sanity CMS. Features seamless cart management and secure checkout.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe", "Sanity"],
    github: "#",
    live: "#"
  },
  {
    title: "Real-time Task Manager",
    description: "Collaborative project management tool with real-time updates. Implemented WebSockets for instant state sync across multiple connected clients.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    github: "#",
    live: "#"
  },
  {
    title: "AI Image Generator",
    description: "SaaS application leveraging OpenAI's DALL-E API. Includes user authentication, image gallery, and cloud storage integration.",
    tags: ["React", "OpenAI", "Firebase", "Node.js"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all flex flex-col h-full"
            >
              {/* Project Image Placeholder */}
              <div className="w-full h-48 bg-purple-900/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#16171d] to-transparent z-10" />
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">
                      <FaGithub size={20} />
                    </a>
                    <a href={project.live} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

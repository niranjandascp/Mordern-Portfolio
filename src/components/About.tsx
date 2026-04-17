import { motion } from 'framer-motion';
import { User, Target, Zap } from 'lucide-react';

export default function About() {
  const cards = [
    {
      icon: <User className="text-orange-400" size={24} />,
      title: "Who I am",
      description: "A passionate developer who loves transforming complex problems into elegant, intuitive, and scalable solutions."
    },
    {
      icon: <Target className="text-orange-400" size={24} />,
      title: "What I do",
      description: "I build responsive front-end interfaces, robust backend APIs, and piece them together to create seamless full-stack applications."
    },
    {
      icon: <Zap className="text-orange-400" size={24} />,
      title: "My approach",
      description: "Clean code, modern architecture, and a constant drive to learn new technologies and best practices."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary">About Me</h2>
          <div className="w-20 h-1 bg-[#C4521A] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-border-main p-8 rounded-2xl hover:border-[#C4521A]/30 transition-all shadow-lg"
            >
              <div className="w-12 h-12 bg-[#C4521A]/20 rounded-xl flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">{card.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

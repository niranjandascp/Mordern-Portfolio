import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const badges = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { title: "Google Cloud Fundamentals", issuer: "Google" },
  { title: "Frontend Web Development", issuer: "freeCodeCamp" },
  { title: "JavaScript Algorithms", issuer: "HackerRank" }
];

export default function Badges() {
  return (
    <section id="badges" className="py-24 relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary">Badges & Certifications</h2>
          <div className="w-20 h-1 bg-[#C4521A] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white/[0.03] backdrop-blur-xl border border-border-main rounded-2xl hover:border-[#C4521A]/30 transition-all group shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#C4521A]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-[#C4521A] dark:text-orange-400" size={32} />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{badge.title}</h3>
              <p className="text-xs text-text-secondary">{badge.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

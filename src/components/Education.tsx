import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';

const educationList = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "XYZ University",
    duration: "2020 - 2024",
    description: "Specialized in Artificial Intelligence and web application architectures."
  },
  {
    degree: "Higher Secondary Education",
    institution: "ABC Public School",
    duration: "2018 - 2020",
    description: "Mathematics and Computer Science."
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative bg-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Education</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {educationList.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="text-purple-400" size={24} />
                    <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  </div>
                  <h4 className="text-lg text-gray-300 mb-2">{edu.institution}</h4>
                  <p className="text-gray-400 text-sm">{edu.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full shrink-0">
                  <Calendar size={16} className="text-purple-400" />
                  <span className="text-sm font-medium text-gray-300">{edu.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, memo } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollHeading from '@/components/ui/ScrollHeading';

const educationList = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'XYZ University',
    duration: '2020 - 2024',
    description: 'Specialized in Artificial Intelligence and web application architectures.',
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'ABC Public School',
    duration: '2018 - 2020',
    description: 'Mathematics and Computer Science.',
  },
];

export default memo(function Education() {
  return (
    <section id="education" className="py-24 relative transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <ScrollHeading className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary">
            Education
          </h2>
          <div className="w-20 h-1 bg-[#C4521A] mx-auto rounded-full" />
        </ScrollHeading>

        <div className="space-y-8">
          {educationList.map((edu, idx) => (
            <ScrollReveal key={idx} animationNum={idx} direction="alternate" className="relative pl-8 md:pl-0">
              <div className="md:flex items-center justify-between bg-white/[0.03] backdrop-blur-md border border-border-main p-4 sm:p-6 rounded-2xl hover:border-[#C4521A]/30 transition-all shadow-xl shadow-black/10 dark:shadow-none">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="text-[#C4521A] dark:text-orange-400" size={24} />
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">{edu.degree}</h3>
                  </div>
                  <h4 className="text-lg text-text-secondary mb-2 font-medium">
                    {edu.institution}
                  </h4>
                  <p className="text-text-secondary text-sm opacity-80">{edu.description}</p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-border-main rounded-full shrink-0">
                  <Calendar size={16} className="text-[#C4521A] dark:text-orange-400" />
                  <span className="text-sm font-medium text-text-secondary">{edu.duration}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

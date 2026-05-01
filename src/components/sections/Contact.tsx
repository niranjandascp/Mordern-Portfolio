import { motion, memo } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default memo(function Contact() {
  return (
    <section id="contact" className="py-24 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-text-primary">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-[#C4521A] mx-auto rounded-full" />
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to
            say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-8">
            <ScrollReveal animationNum={0} direction="left" className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white/[0.03] backdrop-blur-md border border-border-main rounded-2xl shadow-sm hover:border-[#C4521A]/30 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#C4521A]/20 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-[#C4521A] dark:text-orange-400" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">
                  Email
                </h4>
                <a
                  href="mailto:hello@example.com"
                  className="text-lg sm:text-xl font-medium text-text-primary hover:text-[#C4521A] transition-colors break-all"
                >
                  hello@example.com
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal animationNum={1} direction="left" className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white/[0.03] backdrop-blur-md border border-border-main rounded-2xl shadow-sm hover:border-[#C4521A]/30 transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#C4521A]/20 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-[#C4521A] dark:text-orange-400" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">
                  Location
                </h4>
                <p className="text-xl font-medium text-text-primary">India</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form Placeholder */}
          <ScrollReveal animationNum={0} direction="right">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/[0.03] backdrop-blur-xl border border-border-main rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-[#C4521A] transition-colors shadow-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/[0.03] backdrop-blur-xl border border-border-main rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-[#C4521A] transition-colors shadow-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message..."
                  rows={4}
                  className="w-full bg-white/[0.03] backdrop-blur-xl border border-border-main rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-[#C4521A] transition-colors resize-none shadow-sm text-sm sm:text-base"
                />
              </div>
              <button className="w-full bg-[#C4521A] hover:bg-purple-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg">
                Send Message <Send size={18} />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

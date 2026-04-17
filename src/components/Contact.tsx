import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Get In Touch</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-purple-400" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                <a href="mailto:hello@example.com" className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
                  hello@example.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-purple-400" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                <p className="text-xl font-medium text-white">India</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message..." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

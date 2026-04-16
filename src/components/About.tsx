import { motion } from 'motion/react';
import { FOUNDERS, PAGE_BANNERS } from '../constants';

export default function About() {
  return (
    <div className="min-h-screen bg-studio-bg text-studio-ink">
      {/* Banner Section */}
      <section className="relative h-[70vh] flex items-end px-6 md:px-12 lg:px-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/30 to-transparent z-10" />
          <img
            src={PAGE_BANNERS.about}
            className="w-full h-full object-cover opacity-90"
            alt="About Banner"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-20 max-w-3xl"
        >
          <span className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-3 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4 leading-none">
            The <span className="text-studio-accent">Founders</span>
          </h1>
          <p className="text-base md:text-lg text-studio-ink/75 font-serif italic max-w-xl leading-relaxed">
            Source II Studio is a high-tech graphics powerhouse built on over 11 years of market excellence. We merge traditional artistic mastery with advanced digital workflows to deliver world-class content globally.
          </p>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pb-32">
        {FOUNDERS.map((founder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1, 
              delay: index * 0.2,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="relative aspect-[3/4] mb-8 group">
              {/* Hand-drawn style background layers */}
              <div className="absolute -inset-2 border-2 border-studio-accent/30 hand-drawn-border -rotate-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-2 border-2 border-studio-ink/10 hand-drawn-border rotate-1" />
              
              <div className="relative h-full w-full overflow-hidden hand-drawn-border shadow-2xl bg-studio-ink/5 border border-studio-ink/10">
                <img 
                  src={founder.image} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  alt={founder.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Hover Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-studio-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-2">Founder Profile</p>
                  <h4 className="text-xl font-bold uppercase tracking-tighter text-white">{founder.name}</h4>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-studio-accent font-mono text-sm uppercase tracking-widest">{founder.role}</p>
              <div className="h-px w-12 bg-studio-accent group-hover:w-full transition-all duration-700" />
              <p className="text-studio-ink/60 leading-relaxed font-light text-lg italic font-serif">
                "{founder.bio}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="py-32 border-t border-studio-ink/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold uppercase tracking-tighter mb-12"
            >
              Our Studio Culture
            </motion.h2>
            <div className="space-y-8 text-xl text-studio-ink/50 leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                At Source II Studio, we believe in the synergy of human creativity and technological precision. Our office environment is designed to foster collaboration, where artists and technologists work side-by-side to push the boundaries of digital art.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                With a global team and a focus on high-tech content pipelines, we provide a professional environment that attracts the best talent in the industry.
              </motion.p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative group"
          >
            <img 
              src="/images/about/studio-culture.png"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 grayscale sepia-[0.2]"
              alt="Studio Environment"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-studio-accent/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

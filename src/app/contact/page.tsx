"use client";

import PageTransition from "@/components/PageTransition";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";
import { ImageReveal } from "@/components/animations/ImageReveal";

export default function Contact() {
  return (
    <PageTransition>
      {/* Custom Contact Hero matching the user's 3D image layout */}
      <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-32 lg:pt-40 pb-12">
        {/* Dotted Background using the dedicated world map image */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('/dotted_world_map_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        
        {/* Soft primary gradient matching the vibe */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03] z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom right, var(--primary), transparent)" }}></div>

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 mx-auto flex flex-col lg:flex-row items-center relative z-10 gap-0 md:gap-10 lg:gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <Text3DBounce as="h1" className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.1] mb-2 tracking-tight drop-shadow-sm font-sans whitespace-nowrap" style={{ color: "var(--foreground)" }}>
              Contact Us
            </Text3DBounce>
            
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[3.25rem] font-bold leading-[1.2] mb-6 tracking-tight" style={{ color: "var(--foreground)" }}>
              Start Your Digital <br className="hidden lg:block" />
              <span style={{ color: "var(--primary)" }}>Transformation Journey</span>
            </h2>
            
            <div className="w-16 h-1 mb-8" style={{ backgroundColor: "var(--primary)" }}></div>
            
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-md font-medium">
              Ready to accelerate your growth? Schedule a free technical consultation with our engineering experts to discuss your custom software or AI automation needs.
            </p>
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-4 md:mt-8 lg:mt-0">
            {/* mix-blend-multiply is placed on a non-animated wrapper to prevent CSS composite layer bugs with GSAP */}
            <div className="relative z-10 w-full max-w-[950px] ml-auto mix-blend-multiply">
              <div className="w-full h-full gsap-float">
                <img src="/contact_hero_3d.png" alt="Contact Us 3D Illustration" className="w-full h-auto object-contain brightness-105 contrast-105 scale-110 lg:scale-125 lg:translate-x-12" />
              </div>
            </div>
            
            {/* Soft backdrop glow to enhance the 3D effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full blur-3xl -z-10 pointer-events-none opacity-20" style={{ backgroundColor: "var(--primary)" }}></div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[--primary] text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-3 drop-shadow-sm">Scroll Down</span>
          <div className="w-[28px] h-[46px] border-2 rounded-full flex justify-center p-1.5 shadow-sm" style={{ borderColor: 'var(--primary)' }}>
            <motion.div 
              animate={{ y: [0, 16, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }}
            />
          </div>
        </motion.div>
      </section>

      <div id="contact-form" className="pb-20 px-6 min-h-screen relative overflow-hidden flex flex-col items-center justify-start pt-24 bg-white">
        {/* Animated Background Gradient */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none" 
          style={{ 
            background: "radial-gradient(circle at center, var(--secondary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }} 
        />
        
        <ContactSection />
      </div>

      {/* Location Map Section Matching User Design */}
      <section id="location-map" className="w-full py-6 bg-[var(--background)] relative flex flex-col items-center px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Pill Badge */}
        <div className="flex items-center gap-3 px-5 py-2 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
          <span className="text-xs font-bold tracking-widest text-slate-800 uppercase">Where We Are Located</span>
        </div>
        
        {/* Heading matching the exact website style */}
        <h2 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3.25rem] font-bold leading-[1.2] mb-6 tracking-tight text-center" style={{ color: "var(--foreground)" }}>
          Find Our Office Location Easily
        </h2>
        
        {/* Description */}
        <p className="text-center text-slate-600 max-w-2xl mb-8 text-lg font-medium">
          Our office is conveniently located in Noida's prime tech hub, making it simple for clients and partners to visit us for consultations and collaborations.
        </p>

        {/* Map Container - Reduced height and max-width to make it "thinner" and less huge */}
        <div className="w-full max-w-[1100px] h-[350px] md:h-[450px] mx-auto bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white group">
          <iframe 
            src="https://maps.google.com/maps?q=111%2C%20F-Block%2C%20Sector%208%2C%20Noida%2C%20U.P.-201301&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            className="filter contrast-[1.05] saturate-[1.1] transition-transform duration-700 group-hover:scale-105"
          ></iframe>
        </div>
      </section>
    </PageTransition>
  );
}

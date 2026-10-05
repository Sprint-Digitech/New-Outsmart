"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabaseClient";
import PageTransition from "@/components/PageTransition";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import ServiceProcessSection from "@/components/ServiceProcessSection";
import ServiceBenefitsSection from "@/components/ServiceBenefitsSection";

export default function Services() {
  const [servicesList, setServicesList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.warn("Supabase fetch failed (services). Using fallback data.");
        }
        
        if (data && data.length > 0) {
          setServicesList(data);
        } else {
          // Fallback static
          setServicesList([
            { id: "custom-software", slug: "custom-software", category: "Software Engineering", title: "Custom Software", subtitle: "Scalable. Secure. Bespoke.", image: "/service_custom_software.png" },
            { id: "web-mobile", slug: "web-mobile", category: "Digital Platforms", title: "Web & Mobile Apps", subtitle: "Intuitive & Powerful Interfaces.", image: "/service_web_mobile.png" },
            { id: "ai-automation", slug: "ai-automation", category: "Intelligence", title: "AI & Automation", subtitle: "Transformative Autonomous Workflows.", image: "/service_ai_automation.png" },
            { id: "cloud-saas", slug: "cloud-saas", category: "Infrastructure", title: "Cloud & SaaS Products", subtitle: "Infrastructure you can trust.", image: "/service_cloud_saas.png" }
          ]);
        }
      } catch (err) {
        console.warn("Failed to fetch services:", err);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (servicesList.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const panels = gsap.utils.toArray(".fullscreen-panel");

    panels.forEach((panel: any) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false, // Allows the next section to scroll over this one
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [servicesList]);

  return (
    <PageTransition>
      {/* Custom Services Hero matching the exact About/Contact page layout */}
      <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-24 pb-12">
        {/* Dotted Background using the dedicated world map image */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('/dotted_world_map_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

        {/* Soft primary gradient matching the vibe */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03] z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom right, var(--primary), transparent)" }}></div>

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 mx-auto flex flex-col lg:flex-row items-center relative z-10 gap-0 md:gap-10 lg:gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--primary)" }}>
              Our Services
            </h3>

            <Text3DBounce as="h1" className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.1] mb-2 tracking-tight drop-shadow-sm font-sans whitespace-nowrap" style={{ color: "var(--foreground)" }}>
              Our Services
            </Text3DBounce>

            <div className="w-16 h-1 mb-6 md:mb-8 mt-6" style={{ backgroundColor: "var(--primary)" }}></div>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-md font-medium">
              Discover how our Custom Software Development, AI Solutions, and Web & Mobile Applications empower businesses to scale. We build tailored, high-end enterprise technology.
            </p>

            <button
              onClick={() => {
                document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-3 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 btn-default"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            >
              <span className="relative z-10">Explore Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Image (Pure transparent PNG with floating GSAP animation, matching About page) */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-4 md:mt-8 lg:mt-0">
            <img src="/services_hero_3d.png" alt="Our Services 3D Illustration" className="relative z-10 w-full max-w-[850px] ml-auto h-auto object-contain gsap-float scale-105 lg:scale-110 lg:translate-x-8" style={{ filter: "hue-rotate(15deg) saturate(1.1)" }} />

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

      {/* Anchor for scroll */}
      <div id="services-list"></div>

      {/* Full-Screen Service Cards */}
      {servicesList.map((service, idx) => (
        <div
          key={service.id}
          className="fullscreen-panel h-screen w-full relative overflow-hidden flex items-center justify-center"
          style={{ zIndex: 20 + idx }}
        >
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0 bg-[#FCFBFA]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-110"
              style={{ backgroundImage: `url(${service.image})` }}
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-start justify-center h-full pt-16">
            <Link 
              href={`/service/${service.slug}`}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] inline-flex flex-col max-w-full group/card cursor-pointer hover:bg-white/50 transition-colors"
            >
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3" style={{ color: "var(--primary)" }}>
                <span>0{idx + 1} / {service.category}</span>
              </h4>

              <h2 className="text-4xl md:text-6xl lg:text-5xl font-serif tracking-tight text-gray-900 leading-[1.1] mb-4 drop-shadow-sm whitespace-nowrap">
                {service.title}
              </h2>

              <p className="text-lg md:text-2xl text-gray-800 font-medium italic tracking-wide mb-8 max-w-xl">
                {service.subtitle}
              </p>

              <div className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-gray-900">
                <span>Explore Experience</span>
                <span className="w-12 h-[1px] bg-gray-900 transition-all duration-300 group-hover/card:w-24 group-hover/card:bg-[--primary]"></span>
              </div>
            </Link>
          </div>
        </div>
      ))}

      {/* Subsequent Sections wrapper with z-30 and bg-white to slide over the pinned panels */}
      <div className="relative z-30 bg-white">
        
        {/* Process Section */}
        <ServiceProcessSection />

        {/* Benefits Section */}
        <ServiceBenefitsSection />

        {/* Final CTA / Contact Form */}
        <div className="bg-[#F2EFE7]">
          <ContactSection />
        </div>
      </div>
    </PageTransition>
  );
}

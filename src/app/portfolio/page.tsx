"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";
import { supabase } from "@/lib/supabaseClient";
import { projectsData } from "@/data/projects";

const fallbackProjects = projectsData.map((p, idx) => ({
  id: String(idx + 1),
  title: p.title,
  category: p.category,
  img: p.image,
  client: "Outsmart Technology",
  desc: p.overview,
  slug: p.slug
}));

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  const [projectsList, setProjectsList] = useState(fallbackProjects);
  const [categories, setCategories] = useState(["All", "Enterprise HRMS", "Custom Software", "Logistics & Operations", "Web Apps", "Enterprise SaaS"]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.warn("Supabase fetch failed (projects). Using fallback data.");
        }

        if (data && data.length > 0) {
          const formatted = data.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            img: p.image,
            client: "Outsmart Technology",
            desc: p.overview,
            slug: p.slug
          }));
          setProjectsList(formatted);
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(formatted.map(p => p.category)));
          setCategories(["All", ...uniqueCategories]);
        }
      } catch (err) {
        console.warn("Failed to fetch projects:", err);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    if (activeTab === "All") return true;
    return project.category === activeTab;
  });

  return (
    <PageTransition>
      {/* Custom Projects Hero matching the exact About/Contact/Services page layout */}
      <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-24 pb-12">
        {/* Dotted Background using the dedicated world map image */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('/dotted_world_map_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        
        {/* Soft primary gradient matching the vibe */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03] z-0 pointer-events-none" style={{ background: "linear-gradient(to bottom right, var(--primary), transparent)" }}></div>

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 mx-auto flex flex-col lg:flex-row items-center relative z-10 gap-0 md:gap-10 lg:gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-20">
            <h3 className="text-lg font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "var(--primary)" }}>
              Our Projects
            </h3>
            
            <div className="w-16 h-1 mb-8 mt-2" style={{ backgroundColor: "var(--primary)" }}></div>
            
            <div className="flex flex-wrap gap-x-4">
              <Text3DBounce as="h1" className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.1] mb-2 tracking-tight drop-shadow-sm font-sans" style={{ color: "var(--foreground)" }}>
                Our
              </Text3DBounce>
              <Text3DBounce as="h1" className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.1] mb-2 tracking-tight drop-shadow-sm font-sans" style={{ color: "var(--primary)" }}>
                Projects
              </Text3DBounce>
            </div>
            
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 mt-6 max-w-md font-medium">
              Browse our success stories. See how our bespoke SaaS platforms, custom mobile apps, and automated systems have revolutionized operations for top-tier enterprises.
            </p>
            
            <button 
              onClick={() => {
                document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-3 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-[var(--primary)]/30 transition-all hover:-translate-y-1 btn-default"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            >
              <span className="relative z-10">View Portfolio</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Right Image with mix-blend-multiply wrapper and soft mask to hide white fringing and shadows seamlessly */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-4 md:mt-8 lg:mt-0">
            <div className="relative z-10 w-full max-w-[850px] ml-auto mix-blend-multiply">
              <div className="w-full h-full" style={{ WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 95%)", maskImage: "linear-gradient(to bottom, black 85%, transparent 95%)" }}>
                <img src="/projects_hexagon_hero.png" alt="Our Projects Hexagon 3D Illustration" className="w-full h-auto object-contain brightness-105 contrast-105" />
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
      <div id="portfolio-grid" className="pb-20 px-6 min-h-screen">
        <div className="max-w-[1400px] mx-auto pt-16">

          {/* Filter Tabs */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4 mb-10 md:mb-8">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`${index === 0 ? "col-span-2 md:col-span-1" : ""} flex items-center justify-center px-2 md:px-6 py-2.5 md:py-2 rounded-full text-[13px] md:text-sm font-semibold transition-colors relative ${activeTab === category ? "text-white" : "text-gray-600 hover:text-[--primary]"}`}
              >
                {activeTab === category && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const CardWrapper = project.slug ? Link : "div";
                const wrapperProps = project.slug ? { href: `/portfolio/${project.slug}` } : {};

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    {/* @ts-ignore */}
                    <CardWrapper {...wrapperProps} className="flex flex-col h-full">
                      <div className="relative rounded-3xl overflow-hidden aspect-[4/3] mb-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:shadow-xl transition-shadow">
                        {/* Desktop Image */}
                        <div 
                          className="hidden md:block absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                          style={{ backgroundImage: `url('${project.img}')` }}
                        />
                        {/* Mobile Image */}
                        <div 
                          className="md:hidden absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                          style={{ backgroundImage: `url('${project.img}')` }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[--primary] transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <ExternalLink />
                          </div>
                        </div>
                      </div>

                      <div className="px-2 flex flex-col flex-grow">
                        <p className="text-[--secondary] text-xs font-bold uppercase tracking-wider mb-2">{project.category} • {project.client}</p>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[--primary] transition-colors">{project.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{project.desc}</p>

                        {/* Read More Button - Only show if slug exists */}
                        {project.slug && (
                          <div className="mt-auto pb-4">
                            <div className="relative overflow-hidden inline-flex items-center text-sm font-bold gap-2 px-5 py-2.5 rounded-full border-2 border-gray-100 group-hover:border-transparent group-hover:text-white transition-all duration-300" style={{ backgroundColor: "transparent", backgroundImage: "none" }}>
                              <span className="relative z-10 flex items-center gap-2 group-hover:text-white text-gray-700 transition-colors">
                                Read Full Case Study
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </span>
                              {/* Hover Background */}
                              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center justify-center w-full max-w-2xl bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-4">Have a project in mind?</h3>
                <p className="text-gray-600">We're currently taking on new projects for Q3.</p>
              </div>
              <div className="ml-auto">
                <Link href="/contact" className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg" style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

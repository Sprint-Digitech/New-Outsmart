"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageTransition from "@/components/PageTransition";
import AboutUsSection from "@/components/AboutUsSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProjectsSection from "@/components/ProjectsSection";
import IndustriesWeServeSection from "@/components/IndustriesWeServeSection";
import TechnologyStackSection from "@/components/TechnologyStackSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import TrustedBySection from "@/components/TrustedBySection";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";
import { ArrowRight, Code, Cpu, Smartphone, Server } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".service-card");
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      ".stat-item",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-0 lg:pt-40 lg:pb-0 px-6 bg-[#F2EFE7] overflow-hidden flex flex-col justify-between" style={{ minHeight: "90vh" }}>
          
          {/* Right Side Background Arch */}
          <div className="absolute right-0 bottom-0 w-[55%] h-[85%] bg-white rounded-tl-[300px] z-0 hidden lg:block shadow-[0_0_50px_rgba(0,0,0,0.03)]" />
          
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center relative z-10 w-full flex-grow">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-[#0A0A0A] z-20 pb-10 md:pb-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-[--primary]"></span>
                <span className="tracking-widest uppercase text-xs font-bold tracking-[0.2em] text-gray-500">WELCOME TO OUTSMART</span>
              </div>
              
              <Text3DBounce as="h1" className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.05] mb-8 tracking-tight text-gray-900">
                Custom Software Development & AI Solutions Agency
              </Text3DBounce>
              
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 max-w-xl font-medium">
                Outsmart Technology delivers scalable, intelligent, and future-ready digital solutions. We help organizations modernize operations through <Link href="/services" className="text-[--primary] hover:underline font-bold">tailored CRM/ERP systems</Link>, <Link href="/portfolio" className="text-[--primary] hover:underline font-bold">Enterprise SaaS products</Link>, and workflow automation that accelerates growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8">
                <Link 
                  href="/contact" 
                  className="text-white font-black px-8 py-4.5 rounded-xl shadow-lg btn-default whitespace-nowrap"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  Let's Talk
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img className="w-12 h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                    <img className="w-12 h-12 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-xs font-black z-10 text-white" style={{ backgroundColor: "var(--primary)" }}>
                    PROVEN
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-semibold leading-tight max-w-[120px]">
                    Trusted Client Delivery
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[--primary]">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-bold text-sm text-gray-700 tracking-wide">Comprehensive Diagnostics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[--primary]">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="font-bold text-sm text-gray-700 tracking-wide">High-Quality Code Delivery</span>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0 flex justify-center items-end h-full">
              <div className="absolute top-1/4 left-10 text-[--primary] animate-pulse z-20">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
              </div>
              
              <div className="relative z-10 w-full max-w-[600px] ml-auto mix-blend-multiply pb-10 image-anime">
                <img src="/ai-hero-white.png" alt="AI Agent" className="w-full h-auto object-contain" style={{ maxHeight: "75vh" }} />
              </div>

              {/* Floating Learn More Badge */}
              <div className="absolute top-1/3 right-10 bg-white w-[140px] h-[140px] rounded-full border border-gray-100 flex items-center justify-center shadow-2xl z-20 hidden md:flex gsap-float">
                 <Code className="text-[--primary] w-10 h-10 absolute" />
                 <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <path id="circlePathHero" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                    <text className="text-[12px] font-black uppercase tracking-[0.2em] fill-gray-800">
                      <textPath href="#circlePathHero" startOffset="0%">
                        • LEARN MORE • LEARN MORE 
                      </textPath>
                    </text>
                 </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker / Marquee */}
        <div className="w-full overflow-hidden py-5 shadow-xl relative z-20" style={{ backgroundColor: "var(--primary)" }}>
          <div className="flex animate-marquee items-center gap-8 text-white font-black text-xl lg:text-2xl tracking-widest uppercase">
             <span className="whitespace-nowrap">• Custom Software</span>
             <span className="whitespace-nowrap">• Autonomous AI Agents</span>
             <span className="whitespace-nowrap">• Enterprise SaaS</span>
             <span className="whitespace-nowrap">• Cloud Architecture</span>
             <span className="whitespace-nowrap">• Digital Transformation</span>
             {/* Duplicate for infinite effect */}
             <span className="whitespace-nowrap">• Custom Software</span>
             <span className="whitespace-nowrap">• Autonomous AI Agents</span>
             <span className="whitespace-nowrap">• Enterprise SaaS</span>
             <span className="whitespace-nowrap">• Cloud Architecture</span>
             <span className="whitespace-nowrap">• Digital Transformation</span>
             <span className="whitespace-nowrap">• Custom Software</span>
             <span className="whitespace-nowrap">• Autonomous AI Agents</span>
             <span className="whitespace-nowrap">• Enterprise SaaS</span>
          </div>
        </div>

        {/* Trust Indicators Section */}
        <TrustedBySection />

        {/* About Us Section */}
        <div id="about" className="scroll-mt-24"></div>
        <AboutUsSection />

        {/* Why Choose Us / Services Section */}
        <div id="services" className="scroll-mt-24"></div>
        <WhyChooseUsSection />



        {/* Projects Section (Replacing Features Section) */}
        <div id="projects" className="scroll-mt-24"></div>
        <ProjectsSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Industries We Serve Section */}
        <IndustriesWeServeSection />

        {/* Technology Stack Section */}
        <TechnologyStackSection />

        {/* Quick Stats */}
        <section ref={statsRef} className="py-6 relative overflow-hidden text-white" style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center excellence-counter-boxes">
              {[
                { value: "Enterprise", label: "Delivered Solutions" },
                { value: "Automation", label: "AI Workflows" },
                { value: "Trusted", label: "Client Partnerships" },
                { value: "Expertise", label: "Team Experience" },
              ].map((stat, idx) => (
                <div key={idx} className="stat-item excellence-counter-item flex flex-col items-center justify-center p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20">
                  <span className="mb-2 block w-full px-2 text-center text-[clamp(1.5rem,1.8vw,2.3rem)] font-black leading-none tracking-tight">{stat.value}</span>
                  <span className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        </section>



        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Final CTA */}
        <div id="contact" className="scroll-mt-24"></div>
        <section className="py-10 md:py-8 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Text3DBounce as="h2" className="text-4xl md:text-6xl font-bold mb-8">Ready to Outsmart the Competition?</Text3DBounce>
            <p className="text-xl text-gray-600 mb-6">Let&apos;s build smarter digital solutions together.</p>
            <p className="text-lg font-bold text-gray-800 mb-6">
              <span className="text-[--primary]">+91 9599 34 2525</span> | info@outsmarttechnology.com
            </p>
            <Link 
              href="/contact"
              className="inline-block px-10 py-5 rounded-full text-white font-bold text-xl shadow-2xl hover:shadow-[--primary]/50 btn-default"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
            >
              Let's Talk
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

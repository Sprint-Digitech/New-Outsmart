"use client";

import { motion } from "framer-motion";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WhatWeDoSection() {
  const fallbackServices = [
    {
      title: "Custom Software Development",
      slug: "custom-software",
      desc: "We eliminate operational bottlenecks by building tailored systems that automate manual tasks, reduce human error, and scale seamlessly as your business grows."
    },
    {
      title: "Web & Mobile Applications",
      slug: "web-mobile",
      desc: "Engage your customers anywhere with high-performance apps and portals designed to boost conversion rates, build brand loyalty, and deliver a frictionless user experience."
    },
    {
      title: "AI & Automation",
      slug: "ai-automation",
      desc: "Turn your data into a competitive advantage. We deploy intelligent automation to slash operational costs, speed up decision-making, and free your team from repetitive work."
    },
    {
      title: "Cloud & SaaS Products",
      slug: "cloud-saas",
      desc: "Scale your operations effortlessly without IT headaches. Our secure cloud architectures ensure maximum uptime, global accessibility, and ironclad data protection for your peace of mind."
    }
  ];

  const [servicesList, setServicesList] = useState(fallbackServices);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("title, subtitle, slug")
          .order("created_at", { ascending: true })
          .limit(4);

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((s) => ({
            title: s.title,
            slug: s.slug,
            desc: s.subtitle
          }));
          setServicesList(formatted);
        }
      } catch (err) {
        console.warn("Failed to fetch services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <section className="py-8 md:py-6 px-6 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-8 lg:gap-10">
        
        {/* Left Side: Content & List */}
        <div className="w-full lg:w-[55%] flex flex-col">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--primary)" }}></span>
            <span className="tracking-[0.2em] uppercase text-sm font-bold text-gray-600">WHAT WE DO</span>
          </motion.div>

          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6 flex flex-wrap gap-x-3"
          >
            <Text3DBounce as="span">Enterprise software</Text3DBounce>
            <br className="hidden md:block w-full"/>
            <Text3DBounce as="span">solutions you can</Text3DBounce>
            <Text3DBounce as="span" className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, var(--primary), var(--secondary))" }}>
              rely on
            </Text3DBounce>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 font-medium leading-relaxed mb-6 max-w-2xl"
          >
            Stop letting outdated technology hold your business back. We build strategic digital solutions designed specifically to solve your operational challenges, drive revenue, and give you a permanent competitive edge.
          </motion.p>

          {/* Services List (Matching the Repair Site layout) */}
          <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-1.5 before:w-px before:bg-gray-200">
            {servicesList.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="relative pl-8"
              >
                {/* Custom Bullet Dot */}
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full outline outline-4 outline-white" style={{ backgroundColor: "var(--primary)" }}></div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/service/${service.slug}`} className="hover:text-[--primary] transition-colors">{service.title}</Link>
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-lg border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Side: Image & Circle Background */}
        <div className="w-full lg:w-[45%] relative mt-8 md:mt-6 lg:mt-0 flex justify-center lg:justify-end">
          
          {/* Large Circle Background */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full z-0"
            style={{ background: "linear-gradient(135deg, rgba(var(--secondary-rgb, 236,72,153), 0.15), rgba(var(--primary-rgb, 111,29,106), 0.05))" }}
          ></motion.div>

          {/* Main Professional Image */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 w-full max-w-[500px] image-anime rounded-3xl"
          >
            {/* We use an unDraw/Popsy style tech illustration that matches the layout, or the pointing businessman if preferred. 
                For now, let's use a high-quality illustration of a tech professional/team */}
            <img 
              src="/ai_expert_illustration_transparent.png" 
              alt="Expert Software Engineer" 
              className="w-full h-auto drop-shadow-2xl object-contain transform scale-110"
            />
          </motion.div>

          {/* Floating Badge (Proven Expertise equivalent) */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
            className="hidden md:flex absolute top-1/4 right-0 lg:-right-8 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 border border-gray-100 flex-col items-center gsap-float"
          >
            <span className="text-4xl font-black mb-1 flex items-center justify-center" style={{ color: "var(--primary)" }}>
              PROVEN
            </span>
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">EXPERTISE</span>
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute bottom-20 left-10 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center z-20 border border-gray-100 gsap-float">
             <svg className="w-8 h-8" style={{ color: "var(--secondary)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>

        </div>

      </div>
    </section>
  );
}

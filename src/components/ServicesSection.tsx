"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Cloud, Smartphone, Database, Bot } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";

export default function ServicesSection() {
  const fallbackServices = [
    {
      id: "custom-software",
      title: "Custom Software",
      desc: "ERP Systems, CRM Solutions, HRMS Platforms, Inventory & Warehouse Systems, Workflow Automation.",
      icon: <Code className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "web-mobile",
      title: "Web & Mobile Apps",
      desc: "Android/iOS Apps, Customer Portals, Business Dashboards, Multi-Vendor Platforms.",
      icon: <Smartphone className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      desc: "AI Integrations, Chatbots, Predictive Analytics, Process Automation.",
      icon: <Bot className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cloud-saas",
      title: "Cloud & SaaS Products",
      desc: "Multi-Tenant SaaS, Subscription Platforms, Scalable Cloud Apps.",
      icon: <Cloud className="w-8 h-8" />,
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [servicesList, setServicesList] = useState(fallbackServices);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("slug, title, subtitle, image, category")
          .order("created_at", { ascending: true })
          .limit(4);

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((s) => ({
            id: s.slug,
            title: s.title,
            desc: s.subtitle,
            icon: <Code className="w-8 h-8" />, // Default icon
            img: s.image
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
    <section className="py-6 px-6 bg-transparent font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-8">
          <div className="max-w-2xl">
            <h4 className="font-bold tracking-widest text-sm mb-4 flex items-center gap-2" style={{ color: "var(--primary)" }}>
              / Services
            </h4>
            <Text3DBounce as="h2" className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
              We Provide The Best Services
            </Text3DBounce>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              We offer top-tier software engineering and AI solutions tailored to your enterprise needs. Our expert team builds scalable, secure, and intelligent systems to drive unparalleled growth.
            </p>
          </div>
          
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full shadow-lg shrink-0 btn-default"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Explore Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {servicesList.map((service, idx) => (
            <Link href={`/service/${service.id}`} key={idx} className="group relative rounded-3xl overflow-hidden h-[320px] sm:h-[280px] shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.img})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Top Left Icon */}
              <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300 border border-white/30 group-hover:bg-[--primary] group-hover:border-[--primary]">
                {service.icon}
              </div>
              
              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 font-medium line-clamp-3">
                  {service.desc}
                </p>
                
                {/* Arrow Button */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300 border border-white/30 group-hover:bg-[--primary] group-hover:border-[--primary]">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}

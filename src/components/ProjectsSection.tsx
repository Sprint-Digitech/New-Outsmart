"use client";

import Link from "next/link";
import { Text3DBounce } from "@/components/animations/SplitTextAnimations";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { projectsData } from "@/data/projects";

interface ProjectItem {
  category: string;
  title: string;
  image: string;
  slug: string;
}

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("category, title, image, slug")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjectsList(data);
        } else {
          setProjectsList(projectsData.slice(0, 3));
        }
      } catch (err) {
        console.warn("Failed to fetch projects, falling back to static:", err);
        setProjectsList(projectsData.slice(0, 3));
      }
    }
    fetchProjects();
  }, []);
  return (
    <section className="py-6 px-6 bg-transparent font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="max-w-2xl">
            {/* Pill */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--primary)" }}></span>
              <span className="text-[13px] font-bold uppercase tracking-widest text-gray-800">Our Projects</span>
            </div>

            {/* Heading */}
            <Text3DBounce as="h2" className="text-4xl md:text-[3.5rem] font-bold text-[#0A0A0A] leading-[1.1] tracking-tight">
              Our expert software<br />and successful projects
            </Text3DBounce>
          </div>

          <Link
            href="/portfolio"
            className="px-8 py-3.5 rounded-lg font-bold text-white btn-default"
            style={{ backgroundColor: "var(--primary)" }}
          >
            View All Project
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsList.map((project, idx) => (
            <Link href={`/portfolio/${project.slug}`} key={idx} className="group cursor-pointer flex flex-col h-full">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] relative image-anime">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Text Content */}
              <p className="text-gray-500 font-medium text-[15px] mb-2">{project.category}</p>
              <h3 className="text-[22px] font-bold text-gray-900 group-hover:text-[--primary] transition-colors mb-6">{project.title}</h3>

              {/* Read More Button */}
              <div className="mt-auto">
                <div className="relative overflow-hidden inline-flex items-center text-sm font-bold gap-2 px-5 py-2.5 rounded-full border-2 border-gray-100 group-hover:border-transparent group-hover:text-white transition-all duration-300" style={{ backgroundColor: "transparent", backgroundImage: "none" }}>
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white text-gray-700 transition-colors">
                    Read Full Case Study
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  {/* Hover Background - Absolute fill */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

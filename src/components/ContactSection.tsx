"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Software Development",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom Validation
    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please provide some details about your project.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", type: "Software Development", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="py-6 px-6 relative w-full">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-5/12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--primary)" }}
          >
            Let's Connect.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-700 mb-6"
          >
            We're here to help and answer any question you may have. Let's build something great together!
          </motion.p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-[--primary] shadow-sm shrink-0">
                <Phone size={20} />
              </div>
              <p className="text-lg font-bold text-gray-800">+91 9599 34 2525</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-[--primary] shadow-sm shrink-0">
                <Mail size={20} />
              </div>
              <p className="text-lg font-bold text-gray-800">info@outsmarttechnology.com</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-[--primary] shadow-sm shrink-0">
                <MapPin size={20} />
              </div>
              <p className="text-lg font-bold text-gray-800">www.outsmarttechnology.com</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
            <h3 className="text-3xl font-bold mb-2">Send a Message</h3>
            <p className="text-sm text-gray-500 mb-8 font-medium">We aim to respond to all inquiries within <span className="font-bold text-[var(--primary)]">24 hours</span>.</p>
            
            {status === "success" ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center border border-green-200">
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input 
                      suppressHydrationWarning={true}
                      type="text" 
                      className={`w-full bg-transparent/50 border ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 focus:border-[--primary]'} focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-colors`}
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[0-9]/g, '');
                        setFormData({...formData, name: val});
                        if (errors.name) setErrors({...errors, name: undefined});
                      }}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input 
                      suppressHydrationWarning={true}
                      type="email" 
                      className={`w-full bg-transparent/50 border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 focus:border-[--primary]'} focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-colors`}
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                  <select 
                    suppressHydrationWarning={true}
                    className="w-full bg-transparent/50 border border-gray-200 hover:border-gray-300 focus:border-[--primary] focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-colors appearance-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Software Development</option>
                    <option>AI Agent Development</option>
                    <option>AI App Development</option>
                    <option>IT Consulting</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea 
                    suppressHydrationWarning={true}
                    rows={5}
                    className={`w-full bg-transparent/50 border ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-gray-300 focus:border-[--primary]'} focus:bg-white focus:ring-0 rounded-xl px-4 py-3 outline-none transition-colors resize-none`}
                    placeholder="Tell us about your project requirements, timeline, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({...formData, message: e.target.value});
                      if (errors.message) setErrors({...errors, message: undefined});
                    }}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>}
                </div>

                <button 
                  suppressHydrationWarning={true}
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                  style={{ background: "linear-gradient(90deg, var(--primary), var(--secondary))" }}
                >
                  {status === "loading" ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
                </button>
                
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center mt-4">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

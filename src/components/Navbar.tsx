"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <header className="fixed top-0 md:top-4 left-0 right-0 z-50 px-0 md:px-8 pointer-events-none flex justify-center">
      <nav 
        className={clsx(
          "w-full max-w-6xl bg-white rounded-none md:rounded-full px-4 md:px-6 flex items-center justify-between pointer-events-auto border-b md:border border-gray-100 transition-all duration-500 ease-in-out",
          scrolled ? "py-1.5 md:py-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] translate-y-0" : "py-2.5 md:py-4 shadow-md md:translate-y-2"
        )}
      >
        {/* Logo - Left */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Outsmart Technology"
              className={clsx(
                "w-auto object-contain transition-all duration-500 ease-in-out origin-left scale-[1.3] md:scale-[1.4] hover:scale-[1.35] md:hover:scale-[1.45]",
                scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
              )}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML += '<span class="text-2xl font-black tracking-tight text-gray-900">Outsmart<span style="color: var(--primary)">.</span></span>';
              }}
            />
          </Link>
        </div>

        {/* Links - Center */}
        <div className="hidden lg:flex items-center justify-center space-x-8 flex-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[15px] font-bold transition-colors hover:text-[--primary] ${pathname === link.href ? 'text-[--primary]' : 'text-gray-800'}`}
              onClick={(e) => {
                if (window.location.pathname === link.href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 h-1 w-1 rounded-full"
                  style={{ background: "var(--primary)" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button - Right */}
        <div className="flex-1 flex items-center justify-end">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 md:gap-3 pl-1 md:pl-1.5 pr-3 md:pr-5 py-1 md:py-1.5 rounded-lg md:rounded-xl text-white text-[12px] sm:text-[13px] md:text-[15px] font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 group whitespace-nowrap"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-black/20 flex items-center justify-center transition-transform group-hover:bg-black/30">
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-white group-hover:rotate-12 transition-transform" />
            </div>
            Let's Talk
          </Link>

          {/* Mobile Menu Toggle */}
          <button suppressHydrationWarning className="lg:hidden ml-2 md:ml-4 p-1.5 md:p-2 rounded-full bg-gray-50 text-gray-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-4 right-4 mt-4 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 lg:hidden pointer-events-auto"
          >
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (window.location.pathname === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={clsx(
                    "text-lg font-bold py-3 px-4 rounded-xl transition-colors",
                    pathname === link.href ? "text-white shadow-md" : "text-gray-800 hover:bg-gray-50"
                  )}
                  style={pathname === link.href ? { backgroundColor: "var(--primary)" } : {}}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold shadow-md"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Let's Talk
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

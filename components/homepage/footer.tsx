"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  {
    title: "Privacy",
    href: "/privacy-policy",
  },
  {
    title: "Terms",
    href: "/terms-of-service",
  },
  {
    title: "Docs",
    href: "/docs",
  },
];

export default function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      className="bg-background py-12 border-t border-primary/10 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-12">
          <motion.div
            className="order-last flex items-center gap-3 md:order-first"
            variants={itemVariants}
          >
            <span className="text-muted-foreground block text-center text-sm">
              © {new Date().getFullYear()} HallucentAI. All rights reserved
            </span>
          </motion.div>

          <motion.div
            className="order-first flex flex-wrap gap-x-6 gap-y-4 md:order-last"
            variants={containerVariants}
          >
            {links.map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary block duration-150 relative group"
                >
                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="inline-block"
                  >
                    {link.title}
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}

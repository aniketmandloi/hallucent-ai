"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="py-20 pt-32 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative text-center">
          <motion.p className="text-3xl" variants={itemVariants}>
            🛡️
          </motion.p>

          <motion.h1
            className="mx-auto mt-12 max-w-xl text-balance text-5xl font-medium md:text-6xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Detect AI Hallucinations in Real-Time
          </motion.h1>

          <motion.p
            className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl"
            variants={itemVariants}
          >
            HallucentAI ensures your AI-generated content is accurate, reliable,
            and trustworthy with advanced hallucination detection.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl glow-blue-sm hover:glow-blue-md transition-all duration-200"
              >
                <Link href="/dashboard" prefetch={true}>
                  <span className="text-nowrap">Get Started</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                variant="outline"
                size="sm"
                className="backdrop-blur-sm"
              >
                <Link href="#features">
                  <span className="text-nowrap">Learn More</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-8 overflow-hidden rounded-3xl bg-black/10"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 size-full object-cover"
            width={1920}
            height={1080}
          />

          <motion.div
            className="relative m-4 overflow-hidden border border-transparent shadow-xl shadow-black/15 ring-1 ring-primary/20 sm:m-8 md:m-12 rounded-2xl backdrop-blur-xl"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 102, 255, 0.2)",
                "0 0 30px rgba(0, 102, 255, 0.4)",
                "0 0 20px rgba(0, 102, 255, 0.2)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/GsZRNq5WsAAMbrG-H9YrPK4HJnXSQV692jECFST4zyYpva.jpg"
              alt="app screen"
              width="2880"
              height="1842"
              className="object-top-left size-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Zap,
  Brain,
  CheckCircle2,
  GitBranch,
  Lock,
} from "lucide-react";

export default function Integrations() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const features = [
    {
      icon: Shield,
      title: "Real-Time Detection",
      description:
        "Instantly identify hallucinations as AI generates content with our advanced detection algorithms.",
      color: "text-blue-500",
    },
    {
      icon: Brain,
      title: "Multi-Model Support",
      description:
        "Works with GPT-4, Claude, Gemini, and other leading AI models for comprehensive coverage.",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Sub-second analysis ensures your workflow stays smooth without compromising accuracy.",
      color: "text-yellow-500",
    },
    {
      icon: CheckCircle2,
      title: "Confidence Scoring",
      description:
        "Get detailed confidence scores for every statement to make informed decisions.",
      color: "text-green-500",
    },
    {
      icon: GitBranch,
      title: "Easy Integration",
      description:
        "Simple API integration with comprehensive SDKs for Python, JavaScript, and more.",
      color: "text-indigo-500",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
      color: "text-red-500",
    },
  ];

  return (
    <section id="features">
      <div className="pt-12 pb-32">
        <motion.div
          ref={ref}
          className="mx-auto max-w-5xl px-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={headingVariants}>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Powerful Features for AI Trust
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Advanced hallucination detection powered by cutting-edge AI
              technology and real-time verification.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {features.map((feature) => (
              <IntegrationCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                variants={cardVariants}
                icon={feature.icon}
                iconColor={feature.color}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  variants,
  icon: Icon,
  iconColor,
}: {
  title: string;
  description: string;
  variants?: any;
  icon: any;
  iconColor?: string;
}) => {
  const CardContent = () => (
    <div className="relative">
      <motion.div
        className={`${iconColor} w-10 h-10`}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon className="w-full h-full" />
      </motion.div>

      <div className="mt-6 space-y-1.5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );

  return (
    <motion.div variants={variants}>
      <motion.div
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          y: -8,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Card className="p-6 h-full cursor-pointer backdrop-blur-sm bg-card/50 border-t-2 border-t-primary/20 hover:border-t-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-md group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
          <div className="relative">
            <CardContent />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

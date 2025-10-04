"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

interface PricingTableProps {
  subscriptionDetails: SubscriptionDetailsResult;
}

export default function PricingTable({
  subscriptionDetails,
}: PricingTableProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleCheckout = async (productId: string, slug: string) => {
    if (isAuthenticated === false) {
      router.push("/sign-in");
      return;
    }

    try {
      await authClient.checkout({
        products: [productId],
        slug: slug,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      // TODO: Add user-facing error notification
      toast.error("Oops, something went wrong");
    }
  };

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open subscription management");
    }
  };

  const STARTER_TIER = process.env.NEXT_PUBLIC_STARTER_TIER;
  const STARTER_SLUG = process.env.NEXT_PUBLIC_STARTER_SLUG;

  if (!STARTER_TIER || !STARTER_SLUG) {
    throw new Error("Missing required environment variables for Starter tier");
  }

  const isCurrentPlan = (tierProductId: string) => {
    return (
      subscriptionDetails.hasSubscription &&
      subscriptionDetails.subscription?.productId === tierProductId &&
      subscriptionDetails.subscription?.status === "active"
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section
      id="pricing"
      ref={ref}
      className="flex flex-col items-center justify-center px-4 mb-24 w-full"
    >
      <motion.div
        className="text-center mb-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
          variants={headingVariants}
        >
          <span className="text-sm font-medium text-foreground/80">
            Pricing
          </span>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-4 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-[1.1]"
          variants={headingVariants}
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          variants={headingVariants}
        >
          Choose the perfect plan for your AI verification needs.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Starter Tier */}
        <motion.div variants={cardVariants}>
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <Card className="relative h-fit backdrop-blur-sm bg-card border border-border/40 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              {isCurrentPlan(STARTER_TIER) && (
                <motion.div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-primary to-blue-600 text-white font-medium"
                  >
                    Current Plan
                  </Badge>
                </motion.div>
              )}
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-semibold">Pro</CardTitle>
                <CardDescription className="text-base mt-2">
                  For teams and growing businesses
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-semibold tracking-tight">
                    $25
                  </span>
                  <span className="text-muted-foreground text-lg font-medium">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-8">
                {[
                  "10,000 API calls/month",
                  "Multi-model support",
                  "Real-time detection",
                  "Priority support",
                  "Advanced analytics",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="flex-shrink-0"
                    >
                      <div className="rounded-full bg-primary/10 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    </motion.div>
                    <span className="text-sm font-medium text-foreground/90">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter>
                {isCurrentPlan(STARTER_TIER) ? (
                  <div className="w-full space-y-2">
                    <Button
                      className="w-full font-medium h-11"
                      variant="outline"
                      onClick={handleManageSubscription}
                    >
                      Manage Subscription
                    </Button>
                    {subscriptionDetails.subscription && (
                      <p className="text-sm text-muted-foreground text-center">
                        {subscriptionDetails.subscription.cancelAtPeriodEnd
                          ? `Expires ${formatDate(
                              subscriptionDetails.subscription.currentPeriodEnd
                            )}`
                          : `Renews ${formatDate(
                              subscriptionDetails.subscription.currentPeriodEnd
                            )}`}
                      </p>
                    )}
                  </div>
                ) : (
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium shadow-lg hover:shadow-xl glow-blue-sm hover:glow-blue-md transition-all duration-300 h-11"
                      onClick={() => handleCheckout(STARTER_TIER, STARTER_SLUG)}
                    >
                      {isAuthenticated === false
                        ? "Sign In to Get Started"
                        : "Get Started →"}
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="mt-16 text-center">
        <p className="text-base text-muted-foreground">
          Need a custom plan?{" "}
          <span className="text-primary cursor-pointer hover:underline font-medium transition-colors">
            Contact us
          </span>
        </p>
      </div>
    </section>
  );
}

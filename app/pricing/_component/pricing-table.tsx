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
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1
          className="text-4xl font-medium tracking-tight mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
          variants={headingVariants}
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground"
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
            <Card className="relative h-fit backdrop-blur-sm bg-card/50 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
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
                    className="bg-gradient-to-r from-primary to-blue-600 text-white"
                  >
                    Current Plan
                  </Badge>
                </motion.div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>
                  For teams and growing businesses
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$25</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    >
                      <Check className="h-5 w-5 text-primary" />
                    </motion.div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter>
                {isCurrentPlan(STARTER_TIER) ? (
                  <div className="w-full space-y-2">
                    <Button
                      className="w-full"
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
                      className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl glow-blue-sm hover:glow-blue-md transition-all duration-200"
                      onClick={() => handleCheckout(STARTER_TIER, STARTER_SLUG)}
                    >
                      {isAuthenticated === false
                        ? "Sign In to Get Started"
                        : "Get Started"}
                    </Button>
                  </motion.div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Need a custom plan?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Contact us
          </span>
        </p>
      </div>
    </section>
  );
}

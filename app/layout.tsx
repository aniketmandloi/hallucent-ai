import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "HallucentAI - Detect AI Hallucinations in Real-Time",
  description:
    "Advanced AI hallucination detection platform. Ensure your AI-generated content is accurate, reliable, and trustworthy with real-time verification and multi-model support.",
  openGraph: {
    title: "HallucentAI - AI Hallucination Detection",
    description:
      "Advanced AI hallucination detection platform. Ensure your AI-generated content is accurate, reliable, and trustworthy with real-time verification.",
    url: "hallucentai.com",
    siteName: "HallucentAI",
    images: [
      {
        url: "https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/nsk-w9fFwBBmLDLxrB896I4xqngTUEEovS.png",
        width: 1200,
        height: 630,
        alt: "HallucentAI - AI Hallucination Detection",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-[-apple-system,BlinkMacSystemFont]antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

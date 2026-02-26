// app/layout.tsx
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/useAuth";
import QueryProvider from "@/components/query-provider";
import { getPortfolioData, resumeType } from "@/lib/query/portfolio";
import { Analytics } from "@vercel/analytics/next"
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const resumeData: resumeType = await getPortfolioData();

  return {
    metadataBase: new URL(resumeData.url),
    title: {
      default: resumeData.name,
      template: `%s | ${resumeData.name}`,
    },
    description: resumeData.description,
    openGraph: {
      title: resumeData.name,
      description: resumeData.description,
      url: resumeData.url,
      siteName: resumeData.name,
      locale: "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "",
      yandex: "",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthContextProvider>
            <QueryProvider>
              <TooltipProvider delayDuration={0}>
                {/* Flickering Grid */}
                <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
                  <FlickeringGrid
                    className="h-full w-full"
                    squareSize={2}
                    gridGap={2}
                    style={{
                      maskImage: "linear-gradient(to bottom, black, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black, transparent)",
                    }}
                  />
                </div>

                {/* Page content */}
                <div className="max-w-3xl mx-auto py-12 pb-24 sm:py-24 px-6">
                  {children}
                </div>
                <Analytics />

                {/* Navbar & Toaster */}
                <Navbar />
                <Toaster />
              </TooltipProvider>
            </QueryProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
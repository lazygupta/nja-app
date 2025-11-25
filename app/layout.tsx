import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Footer } from "@/components/footer";
import { RouteLoaderWrapper } from "@/components/route-loader-wrapper";

export const metadata: Metadata = {
  title: "National Journalist Association",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <RouteLoaderWrapper>
            {children}
          </RouteLoaderWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

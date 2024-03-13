import type { Metadata } from "next";

import { Sora } from "next/font/google";

import "./globals.css";

/* COMPONENTS */
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/wrapper";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Portfolio Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={sora.className}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          enableColorScheme
          enableSystem
        >
          <LayoutWrapper>
            {children}
            <Toaster />
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
};
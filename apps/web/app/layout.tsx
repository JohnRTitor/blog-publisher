import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";

import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@workspace/ui/lib/utils";
import { Toaster } from "@workspace/ui/components/sonner";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Blog Publisher",
  description: "Login and publish your blogs with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        dmSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <main>{children}</main>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

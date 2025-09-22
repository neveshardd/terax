import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loja - Terax World",
  description: "A maior e melhor rede de servidores Minecraft do Brasil!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`} cz-shortcut-listen="true" suppressHydrationWarning>
          <Providers>
            <Header />
            <main className="flex-1 mt-18">
              {children}
            </main>
            <Footer />
          </Providers >
      </body>
    </html>
  );
}

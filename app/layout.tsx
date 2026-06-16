import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALO.INFO | Valorant Database",
  description: "Your complete Valorant encyclopedia — agents, weapons, maps, skins, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-valo-bg text-valo-text antialiased">
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-valo-border mt-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Brand */}
              <div>
                <span className="font-display font-900 text-base tracking-widest text-valo-text">
                  VALO<span className="text-valo-red">.</span>INFO
                </span>
                <p className="font-mono text-[10px] text-valo-muted/40 tracking-widest mt-1 uppercase">
                  Unofficial Valorant Encyclopedia
                </p>
              </div>

              {/* Developer info */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="font-mono text-[10px] text-valo-muted/40 tracking-widest uppercase mb-0.5">Built by</p>
                  <p className="font-display font-700 text-sm tracking-wide text-valo-text">Ashutosh Swamy</p>
                </div>
                <div className="w-px h-8 bg-valo-border hidden sm:block" />
                <a
                  href="https://github.com/ashutoshswamy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] text-valo-muted/50 hover:text-valo-red transition-colors tracking-widest uppercase group"
                >
                  <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-valo-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="font-mono text-[9px] text-valo-muted/30 tracking-widest uppercase">
                Data via valorant-api.com · Not affiliated with Riot Games
              </span>
              <span className="font-mono text-[9px] text-valo-muted/20 tracking-widest">
                VALORANT™ is a trademark of Riot Games
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

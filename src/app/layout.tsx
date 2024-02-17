import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Security Animations",
  description: "Website showcasing animations of various security concepts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*Header */}
        <header className="h-12">
          <div className="flex h-full mx-auto px-2 items-center 2xl:container">
            <div className="w-8 h-8 bg-black rounded"/>
            <h1 className="ml-2">Security Animations</h1>
          </div>
        </header>

        {/*Main Content*/}
        <main className="w-full mx-auto px-2 2xl:container">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Profile",
  description: "Seven questions and discpver your gaming personality!",
  openGraph: {
    title: "What's Your Gaming Profile?",
    images: ['https://res.cloudinary.com/dekobspwg/image/upload/v1735295878/landing_mage_kyihqj.png']
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zenet_esports',
    images: ['https://res.cloudinary.com/dekobspwg/image/upload/v1735295878/landing_mage_kyihqj.png']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

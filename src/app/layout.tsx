import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shivansh Shukla | Aspiring Software Engineer',
  description: 'Portfolio of Shivansh Shukla — Competitive Programmer, Full Stack Developer, ML Enthusiast, and Technical Leader. Explore the universe of a future software engineer.',
  keywords: ['Shivansh Shukla', 'Portfolio', 'Competitive Programming', 'Full Stack Developer', 'Machine Learning', 'BIT Mesra'],
  authors: [{ name: 'Shivansh Shukla' }],
  openGraph: {
    title: 'Shivansh Shukla | Aspiring Software Engineer',
    description: 'Portfolio of Shivansh Shukla — where code meets creativity and engineering excellence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}

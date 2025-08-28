import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import NavProgress from '../components/nav-progress';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Ramkumar Gupta – Applied AI Platform Architect',
  description: 'AI features that are observable, secure, and cost-efficient.',
  openGraph: {
    title: 'Ramkumar Gupta – Applied AI Platform Architect',
    description: 'RAG, guardrails, OTel, SLOs, FinOps.',
    url: 'https://your-domain.com',
    siteName: 'Ram • Portfolio',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ram • Portfolio',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <NavProgress />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

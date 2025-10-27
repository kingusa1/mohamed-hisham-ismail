
'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLinksPage = pathname === '/links';

  if (isLinksPage) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background">
        <main className="flex-1">{children}</main>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  );
}

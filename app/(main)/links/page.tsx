
'use client';

import { cvData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, FolderGit2, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const AnimatedLinkButton = ({ href, icon, text, index }: { href: string; icon: React.ReactNode; text: string; index: number }) => (
  <Button
    asChild
    className={cn(
      "w-full h-14 text-lg bg-white/10 backdrop-blur-md text-foreground border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300 ease-out transform hover:scale-105 animate-fade-in-up"
    )}
    style={{ animationDelay: `${300 + index * 100}ms`, WebkitBackdropFilter: 'blur(12px)' }}
  >
    <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start px-4 space-x-4">
      {icon}
      <span className="flex-grow text-center">{text}</span>
    </Link>
  </Button>
);

export default function LinksPage() {
  const { name, title, contact, profilePhotoUrl } = cvData;
  const { email, phone, linkedin, github, website } = contact;

  const links = [
    { href: '/', icon: <ExternalLink className="h-6 w-6" />, text: 'Personal Website', internal: true },
    { href: '/Mohamed_Ismail_CV.pdf', icon: <FileText className="h-6 w-6" />, text: 'Download Full CV (PDF)', internal: false },
    { href: '/projects', icon: <FolderGit2 className="h-6 w-6" />, text: 'My Projects', internal: true },
    { href: `mailto:${email}`, icon: <Mail className="h-6 w-6" />, text: 'Email Me' },
    { href: linkedin.startsWith('http') ? linkedin : `https://${linkedin}`, icon: <Linkedin className="h-6 w-6" />, text: 'LinkedIn' },
    { href: github.startsWith('http') ? github : `https://${github}`, icon: <Github className="h-6 w-6" />, text: 'GitHub' },
    { href: `tel:${phone}`, icon: <Phone className="h-6 w-6" />, text: 'Call Me' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="animated-gradient-bg fixed inset-0 z-[-1]"></div>
      <style jsx global>{`
        .animated-gradient-bg {
          background: linear-gradient(300deg, hsl(var(--background)), hsl(var(--primary) / 0.3), hsl(var(--background)));
          background-size: 200% 200%;
          animation: gradient-animation 15s ease infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
      `}</style>
      
      <main className="w-full max-w-md mx-auto bg-card/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in-up" style={{ animationDelay: '100ms', WebkitBackdropFilter: 'blur(24px)' }}>
        <div className="text-center mb-8">
          {profilePhotoUrl && (
            <div className="flex justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <Image
                  src={profilePhotoUrl}
                  alt={name}
                  width={128}
                  height={128}
                  className="rounded-full ring-4 ring-offset-4 ring-offset-transparent ring-accent/80 shadow-lg"
                  priority
                  data-ai-hint="portrait person"
                />
                 <div className="absolute inset-0 rounded-full ring-4 ring-accent/50 animate-pulse"></div>
              </div>
            </div>
          )}
          <h1 
            className="text-4xl font-bold font-headline text-foreground animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            {name}
          </h1>
          <p 
            className="text-lg text-foreground/70 mt-2 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            {title}
          </p>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => 
            link.internal ? (
              <Button
                key={link.text}
                asChild
                className={cn(
                  "w-full h-14 text-lg bg-white/10 backdrop-blur-md text-foreground border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300 ease-out transform hover:scale-105 animate-fade-in-up"
                )}
                style={{ animationDelay: `${500 + index * 100}ms`, WebkitBackdropFilter: 'blur(12px)' }}
              >
                <Link href={link.href} className="flex items-center justify-start px-4 space-x-4">
                  {link.icon}
                  <span className="flex-grow text-center">{link.text}</span>
                </Link>
              </Button>
            ) : (
              <AnimatedLinkButton 
                key={link.text}
                href={link.href}
                icon={link.icon}
                text={link.text}
                index={index + 4} // offset index for staggered animation
              />
            )
          )}
        </div>
      </main>

      <footer className="text-center mt-12 text-foreground/60 animate-fade-in-up" style={{ animationDelay: `${600 + links.length * 100}ms` }}>
        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

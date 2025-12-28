"use client";

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, LucideCrown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNavLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageContext } from '@/context/language-context';
import LanguageSwitcher from '@/components/language-switcher';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useContext(LanguageContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = getNavLinks(language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const NavContent = () => (
    <nav className="flex flex-col md:flex-row items-center gap-6 text-lg md:text-sm font-medium">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground",
            activeSection === link.href.substring(1) && "text-primary font-semibold"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-extrabold text-lg">
          <LucideCrown className="h-6 w-6 text-primary" />
          <span className="font-headline">VK Global</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavContent />
          <LanguageSwitcher />
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <Button onClick={toggleTheme} variant="ghost" size="icon" className="mr-2">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                  <div className="flex flex-col items-center justify-center h-full">
                    <NavContent />
                  </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { socialLinks } from '@/lib/data';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} VK Global. All Rights Reserved.</p>
          <p className="text-xs mt-1">Website designed and developed for demonstration.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

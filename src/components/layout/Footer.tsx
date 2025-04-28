
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Subscribe } from "@/components/Subscribe";
import { useVisitorStore } from '@/lib/visitorStore';
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const { visitorCount, incrementVisitor, getTotalSubscribers } = useVisitorStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Increment visitor count when component mounts
    incrementVisitor();
    
    // Add scroll event listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [incrementVisitor]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background dark:border-gray-800">
      <div className="container py-12 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-serif font-bold text-primary transition-colors hover:text-primary/90">
                AmitBlogs
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">
              Sharing stories, insights, and perspectives on various topics. Join our community to discover more!
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">Switch theme</span>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-muted-foreground hover:text-primary transition-colors">All Blogs</Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">Search</Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a href="mailto:info@amitblogs.com" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4 text-primary" />
              </a>
            </div>
            <div className="pt-4">
              <h4 className="text-lg font-medium">Stats</h4>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Total Visitors: </span>
                  <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium">{visitorCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Subscribers: </span>
                  <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium">{getTotalSubscribers()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Newsletter</h4>
            <Subscribe />
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12">
          <Separator className="mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} AmitBlogs. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Designed with ❤️ by Amit Kumar
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 p-2 rounded-full bg-primary dark:bg-primary/80 text-primary-foreground dark:text-primary-foreground shadow-lg hover:bg-primary/90 transition-all dark:glow-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
}


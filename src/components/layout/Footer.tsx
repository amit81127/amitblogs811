
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Subscribe } from "@/components/Subscribe";
import { useVisitorStore } from '@/lib/visitorStore';

export function Footer() {
  const { visitorCount, incrementVisitor, getTotalSubscribers } = useVisitorStore();

  useEffect(() => {
    // Increment visitor count when component mounts
    incrementVisitor();
  }, [incrementVisitor]);

  return (
    <footer className="border-t bg-background dark:border-gray-800">
      <div className="container py-12 px-4 flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
          
          <div className="lg:col-span-2">
            <Subscribe />
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AmitBlogs. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Total Visitors: </span>
              <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium">{visitorCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Subscribers: </span>
              <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium">{getTotalSubscribers()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

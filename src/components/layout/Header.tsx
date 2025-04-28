
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <h2 className="text-2xl font-bold text-primary">FluidBlog</h2>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="/blogs" className="text-sm font-medium hover:text-primary">
              Blogs
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeToggle />
          <Link to="/dashboard/new">
            <Button className="hidden md:inline-flex">New Post</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

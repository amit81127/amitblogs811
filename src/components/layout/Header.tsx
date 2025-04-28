
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { isLoggedIn, user, logout } = useAuthStore();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="border-b bg-background">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-serif font-bold text-primary transition-colors hover:text-primary/90">
          AmitBlogs
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/blogs" className="text-foreground/80 hover:text-foreground transition-colors">
            Blogs
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center text-sm">
                <User className="mr-1 h-4 w-4" />
                {user?.email?.split('@')[0]}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

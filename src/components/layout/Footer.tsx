
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">FluidBlog</h3>
            <p className="text-sm text-muted-foreground">
              A modern blog platform created with React and Tailwind CSS.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Navigation</h4>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-sm hover:underline">
                  Home
                </Link>
                <Link to="/blogs" className="text-sm hover:underline">
                  Blogs
                </Link>
                <Link to="/dashboard" className="text-sm hover:underline">
                  Dashboard
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Resources</h4>
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-sm hover:underline">
                  About
                </a>
                <a href="#" className="text-sm hover:underline">
                  Contact
                </a>
                <a href="#" className="text-sm hover:underline">
                  Privacy
                </a>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Follow us</h4>
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-sm hover:underline">
                  Twitter
                </a>
                <a href="#" className="text-sm hover:underline">
                  GitHub
                </a>
                <a href="#" className="text-sm hover:underline">
                  Discord
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex justify-between text-sm text-muted-foreground">
          <p>© 2025 FluidBlog. All rights reserved.</p>
          <p>
            Made with <span className="text-red-500">❤</span> by Lovable
          </p>
        </div>
      </div>
    </footer>
  );
}

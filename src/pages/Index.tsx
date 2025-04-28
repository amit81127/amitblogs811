
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/lib/store";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const { blogs } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Display at most 3 featured blogs
  const featuredBlogs = blogs.slice(0, 3);
  
  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 animate-in dark:glow-text">
            Welcome to <span className="text-primary">AmitBlogs</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A place where ideas come to life. Discover stories, insights, and perspectives on various topics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/blogs">
              <Button size="lg" className="dark:glow-btn hover-lift">
                Explore All Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="dark:border-primary/40 hover-lift">
                Login to Write
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Posts */}
      <section className="py-16 container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-serif dark:glow-text">Featured Posts</h2>
          <Link to="/blogs" className="text-primary hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <div className="p-4">
                  <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {featuredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlogs.map(blog => (
                  <div key={blog.id} className="hover-scale">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg dark:border-gray-700">
                <h3 className="text-xl font-medium mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Check back later for amazing content!
                </p>
                <Link to="/login">
                  <Button className="dark:glow-btn">Login to Create a Blog</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4 dark:glow-text">Join the Conversation</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Like, comment, and engage with our community. Your voice matters!
          </p>
          <Link to="/blogs">
            <Button className="dark:glow-btn hover-lift">
              Start Reading
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

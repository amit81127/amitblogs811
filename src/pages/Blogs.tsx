
import { Layout } from "@/components/layout/Layout";
import { BlogList } from "@/components/blog/BlogList";
import { useBlogStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

export default function Blogs() {
  const { blogs } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          <p className="text-muted-foreground">Browse through all our blog posts</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <BlogList blogs={blogs} />
        )}
      </div>
    </Layout>
  );
}

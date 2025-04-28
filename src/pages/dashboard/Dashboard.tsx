
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogRow } from "@/components/dashboard/BlogRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlogStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/authStore"; 
import { Plus, Search } from "lucide-react";

export default function Dashboard() {
  const { blogs, deleteBlog } = useBlogStore();
  const { toast } = useToast();
  const { isLoggedIn } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Permission denied",
        description: "You must be logged in to delete blogs.",
        variant: "destructive"
      });
      return;
    }
    
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlog(id);
      toast({
        title: "Blog deleted",
        description: `"${title}" has been deleted successfully.`,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your blog posts</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                <div className="flex justify-end">
                  <div className="h-9 bg-muted rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold glow-text dark:text-primary">Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog posts</p>
          </div>
          <Link to="/dashboard/new">
            <Button className="dark:glow-btn">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 dark:border-gray-700 dark:focus:border-primary"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden dark:border-gray-700 dark:neon-border">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <BlogRow
                key={blog.id}
                blog={blog}
                onDelete={() => handleDelete(blog.id, blog.title)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No blogs found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? 'Try a different search term' : 'Create your first blog post!'}
              </p>
              {!searchTerm && (
                <Link to="/dashboard/new" className="mt-4 inline-block">
                  <Button className="mt-4 dark:glow-btn">Create Blog Post</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

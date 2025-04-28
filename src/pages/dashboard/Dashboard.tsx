
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogRow } from "@/components/dashboard/BlogRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlogStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search } from "lucide-react";

export default function Dashboard() {
  const { blogs, deleteBlog } = useBlogStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlog(id);
      toast({
        title: "Blog deleted",
        description: `"${title}" has been deleted successfully.`,
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog posts</p>
          </div>
          <Link to="/dashboard/new">
            <Button>
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
            className="pl-10"
          />
        </div>
        
        <div className="border rounded-lg overflow-hidden">
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
                  <Button>Create Blog Post</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

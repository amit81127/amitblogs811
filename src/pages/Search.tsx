
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog/BlogCard";
import { useBlogStore } from "@/lib/store";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const { blogs } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Posts</h1>
          <p className="text-muted-foreground">Find blog posts by title or content</p>
        </div>
        
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg"
            autoFocus
          />
        </div>
        
        <div className="space-y-4">
          {searchTerm ? (
            filteredBlogs.length > 0 ? (
              <>
                <p className="text-sm">
                  Found {filteredBlogs.length} {filteredBlogs.length === 1 ? "result" : "results"}
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No results found</h3>
                <p className="text-muted-foreground mt-2">
                  Try a different search term
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Start typing to search for blogs
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

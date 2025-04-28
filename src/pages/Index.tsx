
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { Blog, useBlogStore } from "@/lib/store";

export default function Index() {
  const { blogs } = useBlogStore();
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    if (blogs.length > 0) {
      // Featured blogs (could implement a more sophisticated selection)
      setFeaturedBlogs(blogs.slice(0, 1));
      
      // Recent blogs
      setRecentBlogs(blogs.slice(0, 6));
    }
  }, [blogs]);

  return (
    <Layout>
      <section className="space-y-6 pb-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to FluidBlog
          </h1>
          <p className="max-w-[33rem] text-muted-foreground sm:text-xl">
            A modern, responsive blog platform with a beautiful interface and powerful features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/blogs">
              <Button size="lg">Browse Blogs</Button>
            </Link>
            <Link to="/dashboard/new">
              <Button variant="outline" size="lg">Create a Post</Button>
            </Link>
          </div>
        </div>
      </section>

      {featuredBlogs.length > 0 && (
        <section className="space-y-6 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Post</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {featuredBlogs.map(blog => (
              <div key={blog.id} className="col-span-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {blog.coverImage && (
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      <Link to={`/blog/${blog.id}`} className="hover:text-primary transition-colors">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{blog.excerpt}</p>
                    <Link to={`/blog/${blog.id}`}>
                      <Button>Read More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recentBlogs.length > 0 && (
        <section className="space-y-6 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <Link to="/blogs">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}
      
      {blogs.length === 0 && (
        <section className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No blogs yet</h2>
          <p className="text-muted-foreground mb-6">Create your first blog post to get started!</p>
          <Link to="/dashboard/new">
            <Button>Create Blog Post</Button>
          </Link>
        </section>
      )}
    </Layout>
  );
}


import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogDetail as BlogDetailComponent } from "@/components/blog/BlogDetail";
import { useBlogStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlog } = useBlogStore();
  const [blog, setBlog] = useState(id ? getBlog(id) : undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchedBlog = getBlog(id);
      setBlog(fetchedBlog);
      setLoading(false);
      
      if (!fetchedBlog) {
        // Blog not found, redirect after a delay
        setTimeout(() => navigate("/blogs"), 3000);
      }
    }
  }, [id, getBlog, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <p className="text-muted-foreground mb-6">
            Redirecting to blogs...
          </p>
          <Link to="/blogs">
            <Button>Go to Blogs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/blogs">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blogs
            </Button>
          </Link>
        </div>
        <BlogDetailComponent blog={blog} />
      </div>
    </Layout>
  );
}

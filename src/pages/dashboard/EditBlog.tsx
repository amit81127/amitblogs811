
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogForm } from "@/components/blog/BlogForm";
import { Blog, useBlogStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const { getBlog, updateBlog } = useBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchedBlog = getBlog(id);
      setBlog(fetchedBlog);
      setIsLoading(false);
      
      if (!fetchedBlog) {
        toast({
          title: "Blog not found",
          description: "The blog post you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        // Redirect to dashboard after a delay
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    }
  }, [id, getBlog, navigate, toast]);

  const handleSubmit = async (formData: FormData) => {
    if (!id || !blog) return;
    
    setIsSubmitting(true);

    try {
      // Process form data
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;
      const excerpt = formData.get("excerpt") as string;
      const coverImageFile = formData.get("coverImage") as File;

      let coverImage = blog.coverImage;
      if (coverImageFile && coverImageFile.size > 0) {
        // Convert File to base64
        coverImage = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(coverImageFile);
        });
      }

      // Update the blog
      updateBlog(id, {
        title,
        content,
        excerpt,
        coverImage,
      });

      toast({
        title: "Blog post updated",
        description: "Your blog post has been successfully updated.",
      });

      // Redirect to the blog post
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
            The blog post you're trying to edit doesn't exist or has been removed.
          </p>
          <p className="text-muted-foreground mb-6">
            Redirecting to dashboard...
          </p>
          <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" className="pl-0" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Edit Blog Post</h1>
            <p className="text-muted-foreground">
              Make changes to your blog post
            </p>
          </div>
          
          <BlogForm blog={blog} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </Layout>
  );
}

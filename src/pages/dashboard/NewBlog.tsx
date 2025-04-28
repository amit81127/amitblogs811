
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogForm } from "@/components/blog/BlogForm";
import { useBlogStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export default function NewBlog() {
  const { addBlog } = useBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Process form data
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;
      const excerpt = formData.get("excerpt") as string;
      const coverImageFile = formData.get("coverImage") as File;

      let coverImage;
      if (coverImageFile && coverImageFile.size > 0) {
        // Convert File to base64
        coverImage = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(coverImageFile);
        });
      }

      // Add the blog to store
      const blogId = addBlog({
        title,
        content,
        excerpt,
        coverImage,
      });

      toast({
        title: "Blog post created",
        description: "Your blog post has been successfully created.",
      });

      // Redirect to the blog post
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Create New Blog</h1>
            <p className="text-muted-foreground">
              Fill in the form below to create a new blog post
            </p>
          </div>
          
          <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </Layout>
  );
}

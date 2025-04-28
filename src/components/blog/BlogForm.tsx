
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Blog } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  blog?: Blog;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

export function BlogForm({ blog, onSubmit, isSubmitting }: BlogFormProps) {
  const [imagePreview, setImagePreview] = useState<string | undefined>(blog?.coverImage);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={blog?.title}
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Excerpt
        </label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={blog?.excerpt}
          placeholder="Brief description of your blog"
          required
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content (Markdown supported)
        </label>
        <Textarea
          id="content"
          name="content"
          defaultValue={blog?.content}
          placeholder="Write your blog content here... Markdown is supported!"
          required
          className="min-h-[200px]"
          rows={12}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="coverImage" className="text-sm font-medium">
          Cover Image (Optional)
        </label>
        <Input
          id="coverImage"
          name="coverImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Cover preview"
              className="max-h-48 rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
        </Button>
      </div>
    </form>
  );
}

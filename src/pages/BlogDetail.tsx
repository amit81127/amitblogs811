
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BlogDetail as BlogDetailComponent } from "@/components/blog/BlogDetail";
import { useBlogStore, getUserId } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlog, likeBlog, addComment } = useBlogStore();
  const [blog, setBlog] = useState(id ? getBlog(id) : undefined);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = getUserId();
  
  // Check if current user has liked this post
  const hasLiked = blog?.likedBy.includes(userId) || false;

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

  const handleLike = () => {
    if (!id) return;
    
    const isLiked = likeBlog(id, userId);
    
    toast({
      title: isLiked ? "Post liked!" : "Like removed",
      description: isLiked 
        ? "Thanks for showing your appreciation." 
        : "You have removed your like.",
      variant: "default",
    });
    
    // Update the blog state
    setBlog(getBlog(id));
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || !name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulating network delay
    setTimeout(() => {
      addComment(id, name.trim(), message.trim());
      
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      });
      
      // Reset form
      setName("");
      setMessage("");
      setIsSubmitting(false);
      
      // Update blog state
      setBlog(getBlog(id));
    }, 500);
  };

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
        
        <div className="mt-8 flex items-center justify-between border-t border-b py-4 dark:border-gray-700">
          <Button 
            variant={hasLiked ? "default" : "outline"} 
            size="sm"
            onClick={handleLike}
            className={hasLiked ? 
              "bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 transition-colors" : 
              "hover:border-pink-300 dark:hover:border-pink-600"}
          >
            <Heart className={`h-4 w-4 mr-1 ${hasLiked ? "fill-current" : ""}`} />
            {blog.likes} {blog.likes === 1 ? "Like" : "Likes"}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {blog.comments.length} {blog.comments.length === 1 ? "Comment" : "Comments"}
          </div>
        </div>
        
        <div className="mt-8" id="comments">
          <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comments
          </h2>
          
          <div className="space-y-6">
            {blog.comments.length > 0 ? (
              blog.comments.map(comment => (
                <div key={comment.id} className="border-b pb-4 dark:border-gray-700 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{comment.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm">{comment.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
          
          <div className="mt-8 border-t pt-6 dark:border-gray-700">
            <h3 className="text-xl font-serif font-semibold mb-4">Leave a comment</h3>
            
            <form onSubmit={handleComment} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your Comment</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || !name.trim() || !message.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}


import { Blog } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {blog.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <h1 className="font-serif text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
      </p>
      <div className="markdown-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}

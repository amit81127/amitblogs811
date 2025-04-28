
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Blog } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {blog.coverImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4 pb-0">
        <Link to={`/blog/${blog.id}`}>
          <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {blog.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
      </CardFooter>
    </Card>
  );
}

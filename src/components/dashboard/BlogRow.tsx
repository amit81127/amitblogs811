
import { Link } from "react-router-dom";
import { Blog } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Eye, Pencil, Trash } from "lucide-react";

interface BlogRowProps {
  blog: Blog;
  onDelete: () => void;
}

export function BlogRow({ blog, onDelete }: BlogRowProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-medium truncate">{blog.title}</h4>
        <p className="text-sm text-muted-foreground">
          Updated {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
        </p>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <Link to={`/blog/${blog.id}`}>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        </Link>
        <Link to={`/dashboard/edit/${blog.id}`}>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}

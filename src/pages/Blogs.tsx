
import { Layout } from "@/components/layout/Layout";
import { BlogList } from "@/components/blog/BlogList";
import { useBlogStore } from "@/lib/store";

export default function Blogs() {
  const { blogs } = useBlogStore();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          <p className="text-muted-foreground">Browse through all our blog posts</p>
        </div>
        <BlogList blogs={blogs} />
      </div>
    </Layout>
  );
}

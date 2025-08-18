import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="outline" className="mb-6" asChild>
        <Link to="/blogs">← Back to Blog</Link>
      </Button>
      
      <article className="prose prose-lg max-w-none">
        <h1>Blog Post Title</h1>
        <p>Blog post content for post #{id} would be displayed here with proper formatting and styling.</p>
      </article>
    </div>
  );
};

export default BlogDetail;
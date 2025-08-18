import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BlogList = () => {
  const posts = [
    { id: 1, title: "10 High-Paying Micro Tasks", category: "Earning Tips", readTime: "5 min" },
    { id: 2, title: "How to Scale with Micro Workers", category: "Business", readTime: "8 min" },
    { id: 3, title: "Success Story: $0 to $10K Monthly", category: "Success Stories", readTime: "6 min" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge className="mb-4">{post.category}</Badge>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.readTime}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
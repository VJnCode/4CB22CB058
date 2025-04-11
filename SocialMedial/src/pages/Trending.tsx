import { useEffect, useState } from "react";
import { fetchUserPosts, fetchCommentsByPostId } from "../utils/api";
import PostCard from "../components/PostCard";

type PostFromAPI = {
  id: number;
  userId: number;
};


type Post = PostFromAPI & {
  content: string;
};

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getTrending = async () => {
      const allPosts: Post[] = [];

      for (let userId = 1; userId <= 10; userId++) {
        try {
          const res = await fetchUserPosts(userId);
          const enrichedPosts: Post[] = res.map((post: PostFromAPI) => ({
            ...post,
            content: "No content available", // Fallback for missing 'content'
          }));
          allPosts.push(...enrichedPosts);
        } catch (err) {
          console.error(`Failed to fetch posts for user ${userId}`, err);
        }
      }

      const commentCounts: Record<number, number> = {};

      for (const post of allPosts) {
        try {
          const commentRes = await fetchCommentsByPostId(post.id);
          commentCounts[post.id] = commentRes.length;
        } catch (err) {
          commentCounts[post.id] = 0;
          console.error(`Failed to fetch comments for post ${post.id}`, err);
        }
      }

      const maxCount = Math.max(...Object.values(commentCounts));
      const trending = allPosts.filter((post) => commentCounts[post.id] === maxCount);

      setTrendingPosts(trending);
    };

    getTrending();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
      <div className="space-y-4">
        {trendingPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Trending;

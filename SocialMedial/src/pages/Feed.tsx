import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

// Post type
interface Post {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
}

// User type
interface UsersResponse {
  users: { [key: string]: string };
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchAllUserPosts = async () => {
    try {
      const usersRes = await axios.get<UsersResponse>(
        "http://20.244.56.144/evaluation-service/users"
      );

      const userIds = Object.keys(usersRes.data.users);

      const allPosts: Post[] = [];

      // Fetch posts for each user
      for (const userId of userIds) {
        const postRes = await axios.get<{ posts: Post[] }>(
          `http://20.244.56.144/evaluation-service/users/${userId}/posts`
        );
        allPosts.push(...postRes.data.posts);
      }

      // Sort by newest timestamp
      const sortedPosts = allPosts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setPosts(sortedPosts);
    } catch (err) {
      console.error("Error loading feed:", err);
    }
  };

  useEffect(() => {
    fetchAllUserPosts();
    const interval = setInterval(fetchAllUserPosts, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Live Feed</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;

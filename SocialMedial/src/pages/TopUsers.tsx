import { useEffect, useState } from "react";
import { fetchUserPosts, fetchCommentsByPostId, fetchUsers } from "../utils/api";
import UserCard from "../components/UserCard";

// API response types
type APIUser = {
  id: number;
  name: string;
};

type APIPost = {
  id: number;
  userId: number;
};

type APIComment = {
  id: number;
  postId: number;
};

// Extended User type for UI
type User = APIUser & {
  totalComments: number;
};

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const response = await fetchUsers();
        const users: APIUser[] = Array.isArray(response) ? response : response.data || [];

        if (!Array.isArray(users)) throw new Error("Invalid user data received");

        const postsByUser: Record<number, APIPost[]> = {};
        const commentsByPostId: Record<number, APIComment[]> = {};

        for (const user of users) {
          const posts = await fetchUserPosts(user.id);
          postsByUser[user.id] = posts;

          for (const post of posts) {
            const comments = await fetchCommentsByPostId(post.id);
            commentsByPostId[post.id] = comments;
          }
        }

        const userCommentCounts: Record<number, number> = {};

        users.forEach((user) => {
          const posts = postsByUser[user.id] || [];
          const totalComments = posts.reduce((acc, post) => {
            return acc + (commentsByPostId[post.id]?.length || 0);
          }, 0);
          userCommentCounts[user.id] = totalComments;
        });

        const sortedTopUsers: User[] = users
          .map((u) => ({ ...u, totalComments: userCommentCounts[u.id] || 0 }))
          .sort((a, b) => b.totalComments - a.totalComments)
          .slice(0, 5);

        setTopUsers(sortedTopUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
      } finally {
        setLoading(false);
      }
    };

    getTopUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Users</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : topUsers.length === 0 ? (
        <p className="text-gray-500">No top users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;

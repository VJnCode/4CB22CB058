import React from "react";

interface Post {
  id: number;
  userId: number;
  content: string;
}

interface PostCardProps {
  post: Post;
}

const getRandomImage = () =>
  `https://source.unsplash.com/random/400x300?sig=${Math.random()}`;

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex gap-4">
      <img
        src={getRandomImage()}
        className="w-32 h-32 object-cover rounded-md"
        alt="Post"
      />
      <div>
        <h2 className="text-xl font-bold">Post #{post.id}</h2>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;

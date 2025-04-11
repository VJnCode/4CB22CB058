import axios from "axios";
import { getAuthToken } from "./auth";

const BASE_URL = "http://20.244.56.144/evaluation-service";

// Interfaces for type safety
export interface User {
  id: number;
  name: string;
  email: string;

}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  name: string;
  email: string;
}

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.users;
};

// Fetch posts by a specific user
export const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.posts;
};

// Fetch comments for a specific post
export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.comments;
};

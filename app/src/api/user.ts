import axios, { AxiosResponse } from "axios";
import {
  AllPostState,
  CommitState,
  PostCount,
  ProfileState,
} from "../modules/user";
import { getHeaders } from "../utils";
import { Page } from "./page";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;

export type UserSearchCondition = {
  userId?: number;
  githubId?: number;
  userName?: string;
  page?: number;
};

export type PostSearchCondition = {
  userId: number;
  type?: "PUSH" | "GIST" | "IMAGE";
  regDate?: string;
  page?: number;
};

export type PostUpdate = {
  postId: number;
  payload: {
    markdown: string;
  };
};

export type UserProfileFetch = ProfileState & {
  counts: PostCount[];
};

const fetchUserProfile: ({
  userId,
}: UserSearchCondition) => Promise<AxiosResponse<UserProfileFetch>> = ({
  userId,
}) => {
  const headers = getHeaders();
  return axios.get(`${serverUrl}/users?userId=${userId}`, { headers });
};

const fetchPostCount: (userId: number) => Promise<AxiosResponse<PostCount[]>> =
  (userId: number) => {
    const headers = getHeaders();
    return axios.get(`${serverUrl}/posts/count?userId=${userId}`, { headers });
  };

const fetchAllPosts: ({
  userId,
  type,
  regDate,
  page,
}: PostSearchCondition) => Promise<AxiosResponse<Page<AllPostState>>> = ({
  userId,
  type,
  regDate,
  page,
}: PostSearchCondition) => {
  let baseUrl = `${serverUrl}/posts?userId=${userId}`;
  if (type) baseUrl += `&type=${type}`;
  if (regDate) baseUrl += `&regDate=${regDate}`;
  if (page) baseUrl += `&page=${page}`;

  const headers = getHeaders();
  return axios.get(baseUrl, { headers });
};

const fetchCommits: (postId: number) => Promise<AxiosResponse<CommitState[]>> =
  (postId: number) => {
    const headers = getHeaders();
    return axios.get(`${serverUrl}/posts/commit?postId=${postId}`, { headers });
  };

const fetchPost: (postId: number) => Promise<AxiosResponse<AllPostState>> = (
  postId: number
) => {
  const headers = getHeaders();
  return axios.get(`${serverUrl}/posts/${postId}`, { headers });
};

const updatePost: ({
  postId,
  payload,
}: PostUpdate) => Promise<AxiosResponse<void>> = ({
  postId,
  payload,
}: PostUpdate) => {
  const headers = getHeaders();
  return axios.put(`${serverUrl}/posts/${postId}`, payload, { headers });
};

const deletePost: (postId: number) => Promise<AxiosResponse<void>> = (
  postId: number
) => {
  const headers = getHeaders();
  return axios.delete(`${serverUrl}/posts/${postId}`, { headers });
};

const UserApi = {
  fetchUserProfile,
  fetchPostCount,
  fetchCommits,
  fetchAllPosts,
  fetchPost,
  updatePost,
  deletePost,
};
export default UserApi;

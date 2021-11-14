import axios, { AxiosResponse } from "axios";
import {
  AllPostState,
  commitState,
  PostCount,
  ProfileState,
} from "../modules/user";
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
  githubId,
}: UserSearchCondition) => Promise<AxiosResponse<UserProfileFetch>> = ({
  userId,
  githubId,
}) => {
  let baseUrl = `${serverUrl}/users`;
  if (userId) baseUrl += `?userId=${userId}`;
  if (githubId) baseUrl += `?githubId=${githubId}`;
  return axios.get(baseUrl);
};

const fetchPostCount: (userId: number) => Promise<AxiosResponse<PostCount[]>> =
  (userId: number) => axios.get(`${serverUrl}/posts/count?userId=${userId}`);

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
  return axios.get(baseUrl);
};

const fetchCommits: (postId: number) => Promise<AxiosResponse<commitState[]>> =
  (postId: number) => axios.get(`${serverUrl}/posts/commit?postId=${postId}`);

const fetchPost: (postId: number) => Promise<AxiosResponse<AllPostState>> = (
  postId: number
) => axios.get(`${serverUrl}/posts/${postId}`);

const updatePost: ({
  postId,
  payload,
}: PostUpdate) => Promise<AxiosResponse<void>> = ({
  postId,
  payload,
}: PostUpdate) => axios.put(`${serverUrl}/posts/${postId}`, payload);

const deletePost: (postId: number) => Promise<AxiosResponse<void>> = (
  postId: number
) => axios.delete(`${serverUrl}/posts/${postId}`);

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

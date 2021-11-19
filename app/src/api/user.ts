import axios, { AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "../constants";
import {
  AllPostState,
  commitState,
  GistPostState,
  ImagePostState,
  PostCount,
  ProfileState,
  PushPostState,
} from "../modules/user";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;

const accessToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Authorization: "Bearer " + accessToken,
};

export type UserSearchCondition = {
  userId?: number;
  githubId?: number;
  userName?: string;
};

export type PostSearchCondition = {
  userId: number;
  regDate?: string;
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
  return axios.get(baseUrl, { headers });
};

const fetchPostCount: (userId: number) => Promise<AxiosResponse<PostCount[]>> =
  (userId: number) =>
    axios.get(`${serverUrl}/posts/count?userId=${userId}`, { headers });

const fetchPushPosts: (
  userId: number
) => Promise<AxiosResponse<PushPostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/push?userId=${userId}`, { headers });

const fetchGistPosts: (
  userId: number
) => Promise<AxiosResponse<GistPostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/gist?userId=${userId}`, { headers });

const fetchImagePosts: (
  userId: number
) => Promise<AxiosResponse<ImagePostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/image?userId=${userId}`, { headers });

const fetchAllPosts: ({
  userId,
  regDate,
}: PostSearchCondition) => Promise<AxiosResponse<AllPostState[]>> = ({
  userId,
  regDate,
}: PostSearchCondition) => {
  let baseUrl = `${serverUrl}/posts/all?userId=${userId}`;
  if (regDate) baseUrl += `&regDate=${regDate}`;
  return axios.get(baseUrl, { headers });
};

const fetchCommits: (postId: number) => Promise<AxiosResponse<commitState[]>> =
  (postId: number) =>
    axios.get(`${serverUrl}/posts/commit?postId=${postId}`, { headers });

const fetchPost: (postId: number) => Promise<AxiosResponse<AllPostState>> = (
  postId: number
) => axios.get(`${serverUrl}/posts/${postId}`, { headers });

const updatePost: ({
  postId,
  payload,
}: PostUpdate) => Promise<AxiosResponse<void>> = ({
  postId,
  payload,
}: PostUpdate) =>
  axios.put(`${serverUrl}/posts/${postId}`, payload, { headers });

const deletePost: (postId: number) => Promise<AxiosResponse<void>> = (
  postId: number
) => axios.delete(`${serverUrl}/posts/${postId}`, { headers });

const UserApi = {
  fetchUserProfile,
  fetchPostCount,
  fetchPushPosts,
  fetchGistPosts,
  fetchImagePosts,
  fetchCommits,
  fetchAllPosts,
  fetchPost,
  updatePost,
  deletePost,
};
export default UserApi;

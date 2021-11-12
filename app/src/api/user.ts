import axios, { AxiosResponse } from "axios";
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

const fetchUserProfile: ({
  userId,
  githubId,
}: UserSearchCondition) => Promise<AxiosResponse<ProfileState>> = ({
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

const fetchPushPosts: (
  userId: number
) => Promise<AxiosResponse<PushPostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/push?userId=${userId}`);

const fetchGistPosts: (
  userId: number
) => Promise<AxiosResponse<GistPostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/gist?userId=${userId}`);

const fetchImagePosts: (
  userId: number
) => Promise<AxiosResponse<ImagePostState[]>> = (userId: number) =>
  axios.get(`${serverUrl}/posts/image?userId=${userId}`);

const fetchAllPosts: ({
  userId,
  regDate,
}: PostSearchCondition) => Promise<AxiosResponse<AllPostState[]>> = ({
  userId,
  regDate,
}: PostSearchCondition) => {
  let baseUrl = `${serverUrl}/posts/all?userId=${userId}`;
  if (regDate) baseUrl += `&regDate=${regDate}`;
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
  fetchPushPosts,
  fetchGistPosts,
  fetchImagePosts,
  fetchCommits,
  fetchPostCount,
  fetchAllPosts,
  fetchPost,
  updatePost,
  deletePost,
};
export default UserApi;

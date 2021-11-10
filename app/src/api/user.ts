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

export type PostSearchCondition = {
  userId: number;
  regDate?: string;
};

const fetchUserProfile: (
  githubId: number
) => Promise<AxiosResponse<ProfileState>> = (githubId: number) =>
  axios.get(`${serverUrl}/users?githubId=${githubId}`);

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

const fetchCommits: (postId: number) => Promise<AxiosResponse<commitState[]>> =
  (postId: number) => axios.get(`${serverUrl}/posts/commit?postId=${postId}`);

const fetchPostCount: (userId: number) => Promise<AxiosResponse<PostCount[]>> =
  (userId: number) => axios.get(`${serverUrl}/posts/count?userId=${userId}`);

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
  deletePost,
};
export default UserApi;

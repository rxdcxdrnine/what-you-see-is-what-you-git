import axios, { AxiosResponse } from "axios";
import {
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../modules/user";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;

// fetchGithubProfile
export type GithubProfile = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
};

const fetchGithubProfile: (
  username: string
) => Promise<AxiosResponse<GithubProfile>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}`);

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

const UserApi = {
  fetchGithubProfile,
  fetchPushPosts,
  fetchGistPosts,
  fetchImagePosts,
  fetchCommits,
};
export default UserApi;

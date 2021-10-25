import axios, { AxiosResponse } from "axios";
import { GistPostState, ImagePostState, PushPostState } from "../modules/user";

// fetchGithubProfile
export interface GithubProfile {
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
}

const fetchGithubProfile: (
  username: string
) => Promise<AxiosResponse<GithubProfile>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}`);

const fetchPushPosts: (
  userId: number
) => Promise<AxiosResponse<PushPostState[]>> = (userId: number) =>
  axios.get(`http://localhost:8080/posts/push?userId=${userId}`);

const fetchGistPosts: (
  userId: number
) => Promise<AxiosResponse<GistPostState[]>> = (userId: number) =>
  axios.get(`http://localhost:8080/posts/gist?userId=${userId}`);

const fetchImagePosts: (
  userId: number
) => Promise<AxiosResponse<ImagePostState[]>> = (userId: number) =>
  axios.get(`http://localhost:8080/posts/image?userId=${userId}`);

const UserApi = {
  fetchGithubProfile,
  fetchPushPosts,
  fetchGistPosts,
  fetchImagePosts,
};
export default UserApi;

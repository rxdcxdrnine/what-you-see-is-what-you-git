import axios, { AxiosResponse } from "axios";

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

// fetchGithubPushs
const fetchGithubProfile: (
  username: string
) => Promise<AxiosResponse<GithubProfile>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}`);

type GithubPush = {
  id: string;
  type: string;
  actor: Actor;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: Commit[];
  };
  public: boolean;
  created_at: Date;
  org: Actor;
};

type Actor = {
  id: number;
  login: string;
  display_login?: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
};

type Commit = {
  sha: string;
  author: {
    email: string;
    name: string;
  };
  message: string;
  distinct: boolean;
  url: string;
};

const fetchGithubPushes: (
  username: string
) => Promise<AxiosResponse<GithubPush[]>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}/events`);

const UserApi = { fetchGithubProfile, fetchGithubPushes };
export default UserApi;

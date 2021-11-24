import axios, { AxiosResponse } from "axios";
import { OAUTH_TOKEN } from "../constants";

export type GithubSearchCondition = {
  userName: string;
  page: number;
};

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
  created_at: string;
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

// fetchGithubPushs
const fetchGithubPushes: ({
  userName,
  page,
}: GithubSearchCondition) => Promise<AxiosResponse<GithubPush[]>> = ({
  userName,
  page,
}: GithubSearchCondition) => {
  const OAuthToken = localStorage.getItem(OAUTH_TOKEN);
  return axios.get(
    `http://api.github.com/users/${userName}/events?page=${page}`,
    {
      headers: { Authorization: "token  " + OAuthToken },
    }
  );
};

type GithubGist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: GithubGistFile[];
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: null;
  comments_url: string;
  owner: Owner;
  truncated: boolean;
};

type GithubGistFile = {
  [key: string]: {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
  };
};

type Owner = {
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
};

const fetchGithubGists: ({
  userName,
  page,
}: GithubSearchCondition) => Promise<AxiosResponse<GithubGist[]>> = ({
  userName,
  page,
}: GithubSearchCondition) => {
  const OAuthToken = localStorage.getItem(OAUTH_TOKEN);
  return axios.get(
    `http://api.github.com/users/${userName}/gists?page=${page}`,
    {
      headers: { Authorization: "token  " + OAuthToken },
    }
  );
};

const GithubApi = {
  fetchGithubPushes,
  fetchGithubGists,
};

export default GithubApi;

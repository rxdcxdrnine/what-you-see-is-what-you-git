import axios, { AxiosResponse } from "axios";

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

// fetchGithubPushs
const fetchGithubPushes: (
  username: string
) => Promise<AxiosResponse<GithubPush[]>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}/events`);

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
  created_at: Date;
  updated_at: Date;
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

const fetchGithubGists: (
  usename: string
) => Promise<AxiosResponse<GithubGist[]>> = (username: string) =>
  axios.get(`http://api.github.com/users/${username}/gists`);

export type PushPost = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitUrls: string[];
  uploadDate: Date;
  markdown: string;
};

const savePushPost: (pushPost: PushPost) => Promise<AxiosResponse<PushPost>> = (
  pushPost: PushPost
) => axios.post("http://localhost:8080/posts/push", pushPost);

export type GistPost = {
  gistId: string;
  gistDescription: string;
  gistFilenames: string[];
  uploadDate: Date;
  markdown: string;
};

const saveGistPost: (gistPost: GistPost) => Promise<AxiosResponse<GistPost>> = (
  gistPost: GistPost
) => axios.post("http://localhost:8080/posts/gist", gistPost);

export type ImagePost = {
  image: File;
  markdown: string;
};

const saveImagePost: (
  imagePost: ImagePost
) => Promise<AxiosResponse<ImagePost>> = (imagePost: ImagePost) => {
  const formData: FormData = new FormData();
  for (const [key, value] of Object.entries(imagePost)) {
    formData.append(key, value);
  }
  for (const [key, value] of Object.entries(formData)) {
    console.log(key, " : ", value);
  }
  return axios.post("http://localhost:8080/posts/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const WriteApi = {
  fetchGithubPushes,
  fetchGithubGists,
  savePushPost,
  saveGistPost,
  saveImagePost,
};
export default WriteApi;

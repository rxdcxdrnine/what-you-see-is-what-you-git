import axios, { AxiosResponse } from "axios";
import { GistState, PushState } from "../modules/write";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;
const imageUrl: string = process.env.REACT_APP_IMAGE_URL as string;

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
const fetchGithubPushes: (
  userName: string
) => Promise<AxiosResponse<GithubPush[]>> = (userName: string) =>
  axios.get(`http://api.github.com/users/${userName}/events`);

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

const fetchGithubGists: (
  usename: string
) => Promise<AxiosResponse<GithubGist[]>> = (userName: string) =>
  axios.get(`http://api.github.com/users/${userName}/gists`);

export type PushPostSave = PushState & {
  userId: number;
  markdown: string;
};

const savePushPost: (
  pushPost: PushPostSave
) => Promise<AxiosResponse<PushPostSave>> = (pushPost: PushPostSave) =>
  axios.post(`${serverUrl}/posts/push`, pushPost);

export type GistPostSave = GistState & {
  userId: number;
  markdown: string;
};

const saveGistPost: (
  gistPost: GistPostSave
) => Promise<AxiosResponse<GistPostSave>> = (gistPost: GistPostSave) =>
  axios.post(`${serverUrl}/posts/gist`, gistPost);

export type ImagePostSave = {
  userId: number;
  image: File;
  markdown: string;
};

const saveImagePost: (
  imagePost: ImagePostSave
) => Promise<AxiosResponse<ImagePostSave>> = (imagePost: ImagePostSave) => {
  const formData: FormData = new FormData();
  for (const [key, value] of Object.entries(imagePost)) {
    if (typeof value === "number") {
      formData.append(key, value.toString());
    } else {
      formData.append(key, value);
    }
  }
  return axios.post(`${imageUrl}/posts/image`, formData, {
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

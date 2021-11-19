import axios, { AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "../constants";
import { GistState, PushState } from "../modules/write";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;

const accessToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Authorization: "Bearer " + accessToken,
};

export type PushPostSave = PushState & {
  userId: number;
  markdown: string;
};

const savePushPost: (
  pushPost: PushPostSave
) => Promise<AxiosResponse<PushPostSave>> = (pushPost: PushPostSave) =>
  axios.post(`${serverUrl}/posts/push`, pushPost, { headers });

export type GistPostSave = GistState & {
  userId: number;
  markdown: string;
};

const saveGistPost: (
  gistPost: GistPostSave
) => Promise<AxiosResponse<GistPostSave>> = (gistPost: GistPostSave) =>
  axios.post(`${serverUrl}/posts/gist`, gistPost, { headers });

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
  return axios.post(`${serverUrl}/posts/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + accessToken,
    },
  });
};

const WriteApi = {
  savePushPost,
  saveGistPost,
  saveImagePost,
};

export default WriteApi;

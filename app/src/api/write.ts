import axios, { AxiosResponse } from "axios";

export type PushPost = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitUrls: string[];
  uploadedAt: Date;
  markdown: string;
};

const savePushPost: (
  pushPostRequest: PushPost
) => Promise<AxiosResponse<PushPost>> = (pushPostRequest: PushPost) =>
  axios.post("http://localhost:8080/posts/push", pushPostRequest);

const WriteApi = { savePushPost };
export default WriteApi;

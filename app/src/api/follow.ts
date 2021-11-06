import axios, { AxiosResponse } from "axios";
import { FollowItem } from "../modules/follow";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;

export type FollowSave = {
  followingId: number;
  followerId: number;
};

export type FollowDelete = {
  userId: number;
  followId: number;
};

const fetchFollowings: (
  userId: number
) => Promise<AxiosResponse<FollowItem[]>> = (userId: number) =>
  axios.get(`${serverUrl}/follow/following/${userId}`);

const fetchFollowers: (userId: number) => Promise<AxiosResponse<FollowItem[]>> =
  (userId: number) => axios.get(`${serverUrl}/follow/follower/${userId}`);

const searchUsers: (username: string) => Promise<AxiosResponse<FollowItem[]>> =
  (username: string) =>
    axios.get(`${serverUrl}/follow/search?username=${username}`);

const saveFollow: (follow: FollowSave) => Promise<AxiosResponse<FollowSave>> = (
  follow: FollowSave
) => axios.post(`${serverUrl}/follow`, follow);

const removeFollow: (followId: number) => Promise<AxiosResponse<number>> = (
  followId: number
) => axios.delete(`${serverUrl}/follow/${followId}`);

const FollowApi = {
  fetchFollowings,
  fetchFollowers,
  searchUsers,
  saveFollow,
  removeFollow,
};

export default FollowApi;

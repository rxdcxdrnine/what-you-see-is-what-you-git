import axios, { AxiosResponse } from "axios";
import { FollowItem } from "../modules/follow";
import { Page } from "./page";
import { UserSearchCondition } from "./user";

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

const searchUsers: ({
  userId,
  userName,
  page,
}: UserSearchCondition) => Promise<AxiosResponse<Page<FollowItem>>> = ({
  userId,
  userName,
  page,
}) => {
  let baseUrl = `${serverUrl}/follow/search?userId=${userId}&userName=${userName}`;
  if (page) baseUrl += `&page=${page}`;
  return axios.get(baseUrl);
};

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

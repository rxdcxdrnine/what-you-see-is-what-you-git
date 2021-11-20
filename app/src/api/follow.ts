import { getHeaders } from "./../utils/index";
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
) => Promise<AxiosResponse<FollowItem[]>> = (userId: number) => {
  const headers = getHeaders();
  return axios.get(`${serverUrl}/follow/following/${userId}`, { headers });
};

const fetchFollowers: (userId: number) => Promise<AxiosResponse<FollowItem[]>> =
  (userId: number) => {
    const headers = getHeaders();
    return axios.get(`${serverUrl}/follow/follower/${userId}`, { headers });
  };

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

  const headers = getHeaders();
  return axios.get(baseUrl, { headers });
};

const saveFollow: (follow: FollowSave) => Promise<AxiosResponse<FollowSave>> = (
  follow: FollowSave
) => {
  const headers = getHeaders();
  return axios.post(`${serverUrl}/follow`, follow, { headers });
};

const removeFollow: (followId: number) => Promise<AxiosResponse<number>> = (
  followId: number
) => {
  const headers = getHeaders();
  return axios.delete(`${serverUrl}/follow/${followId}`, { headers });
};

const FollowApi = {
  fetchFollowings,
  fetchFollowers,
  searchUsers,
  saveFollow,
  removeFollow,
};

export default FollowApi;

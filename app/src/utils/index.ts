import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "./../constants/index";

export const getPayload: () => { userId: number; userName: string } = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const decoded = jwt.decode(token as string) as jwt.JwtPayload;
  const userId = parseInt(decoded.sub as string);
  const userName = decoded.username;

  return { userId, userName };
};

export const getHeaders: () => { Authorization: string } = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return {
    Authorization: "Bearer " + token,
  };
};

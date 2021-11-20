import jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import LayoutContainer from "../containers/LayoutContainer";
import UserContainer from "../containers/UserContainer";
import { ACCESS_TOKEN } from "../constants";

import "../styles/layout.css";

const UserView = () => {
  const location = useLocation<{ userId: number | null }>();

  let userId: number;
  if (location.state && location.state.userId) {
    userId = location.state && location.state.userId;
  } else {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const decoded = jwt.decode(token as string) as jwt.JwtPayload;
    userId = parseInt(decoded.sub as string);
  }

  return (
    <LayoutContainer>
      <UserContainer userId={userId} />
    </LayoutContainer>
  );
};

export default UserView;

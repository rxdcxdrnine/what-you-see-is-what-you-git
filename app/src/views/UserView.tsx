import jwt from "jsonwebtoken";
import { Redirect, useLocation } from "react-router-dom";
import LayoutContainer from "../containers/LayoutContainer";
import UserContainer from "../containers/UserContainer";
import { ACCESS_TOKEN } from "../constants";

import "../styles/layout.css";

const UserView = () => {
  const location = useLocation<{ userId: number | null }>();
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    if (window.confirm("로그인 후 이용해주세요.")) {
      return <Redirect to="/" />;
    }
  }

  let userId: number;
  if (location.state && location.state.userId) {
    userId = location.state && location.state.userId;
  } else {
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

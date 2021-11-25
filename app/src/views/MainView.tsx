import jwt from "jsonwebtoken";
import { Redirect } from "react-router";

import LayoutContainer from "../containers/LayoutContainer";
import MainContainer from "../containers/MainContainer";
import { ACCESS_TOKEN } from "../constants";

import "../styles/main.css";

const MainView = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    const decoded = jwt.decode(token as string) as jwt.JwtPayload;
    const userId = parseInt(decoded.sub as string);

    return <Redirect to={{ pathname: "/user", state: { userId } }} />;
  } else {
    return (
      <LayoutContainer main={true}>
        <MainContainer />
      </LayoutContainer>
    );
  }
};
export default MainView;

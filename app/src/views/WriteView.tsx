import { Redirect } from "react-router";
import { ACCESS_TOKEN, OAUTH_TOKEN } from "../constants";
import LayoutContainer from "../containers/LayoutContainer";
import WriteContainer from "../containers/WriteContainer";

import "../styles/layout.css";

const WriteView = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const OAuthToken = localStorage.getItem(OAUTH_TOKEN);

  if (!accessToken || !OAuthToken) {
    window.alert("로그인 후 이용해주세요.");

    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(OAUTH_TOKEN);

    return <Redirect to="/" />;
  }
  return (
    <LayoutContainer>
      <WriteContainer />
    </LayoutContainer>
  );
};

export default WriteView;

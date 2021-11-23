import { Redirect } from "react-router";
import { ACCESS_TOKEN } from "../constants";
import LayoutContainer from "../containers/LayoutContainer";
import WriteContainer from "../containers/WriteContainer";

import "../styles/layout.css";

const WriteView = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    if (window.confirm("로그인 후 이용해주세요.")) {
      return <Redirect to="/" />;
    }
  }
  return (
    <LayoutContainer>
      <WriteContainer />
    </LayoutContainer>
  );
};

export default WriteView;

import { Redirect, useLocation } from "react-router";
import { ACCESS_TOKEN } from "../constants";
import FollowContainer, {
  FollowComponentState,
} from "../containers/FollowContainer";
import LayoutContainer from "../containers/LayoutContainer";

import "../styles/layout.css";

const FollowView = () => {
  const location = useLocation<{ component: FollowComponentState }>();
  const component = location.state ? location.state.component : "search";

  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    if (window.confirm("로그인 후 이용해주세요.")) {
      return <Redirect to="/" />;
    }
  }

  return (
    <LayoutContainer>
      <FollowContainer component={component} />
    </LayoutContainer>
  );
};

export default FollowView;

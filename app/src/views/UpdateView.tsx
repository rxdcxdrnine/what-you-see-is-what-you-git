import { Redirect, useLocation } from "react-router";
import { ACCESS_TOKEN } from "../constants";
import LayoutContainer from "../containers/LayoutContainer";
import UpdateContainer from "../containers/UpdateContainer";

import "../styles/layout.css";

const UpdateView = () => {
  const location = useLocation<{ postId: number }>();
  const postId = location.state && location.state.postId;

  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    window.alert("로그인 후 이용해주세요.");
    return <Redirect to="/" />;
  }

  return (
    <LayoutContainer>
      <UpdateContainer postId={postId} />
    </LayoutContainer>
  );
};

export default UpdateView;

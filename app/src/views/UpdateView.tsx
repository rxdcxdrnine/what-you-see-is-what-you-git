import { useLocation } from "react-router";
import LayoutContainer from "../containers/LayoutContainer";
import UpdateContainer from "../containers/UpdateContainer";

import "../styles/layout.css";

const UpdateView = () => {
  const location = useLocation<{ postId: number }>();
  const postId = location.state && location.state.postId;

  return (
    <LayoutContainer>
      <UpdateContainer postId={postId} />
    </LayoutContainer>
  );
};

export default UpdateView;

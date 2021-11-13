import { useLocation } from "react-router";
import FollowContainer, {
  FollowComponentState,
} from "../containers/FollowContainer";
import LayoutContainer from "../containers/LayoutContainer";

import "../styles/layout.css";

const FollowView = () => {
  const location = useLocation<{ component: FollowComponentState }>();
  const component = location.state ? location.state.component : "search";

  return (
    <LayoutContainer>
      <FollowContainer component={component} />
    </LayoutContainer>
  );
};

export default FollowView;

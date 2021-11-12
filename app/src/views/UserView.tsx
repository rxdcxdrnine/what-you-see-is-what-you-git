import { useLocation } from "react-router-dom";
import LayoutContainer from "../containers/LayoutContainer";
import UserContainer from "../containers/UserContainer";

import "../styles/layout.css";

const UserView = () => {
  const location = useLocation<{ userId: number | null }>();
  const userId = location.state && location.state.userId;

  return (
    <LayoutContainer>
      <UserContainer userId={userId} />
    </LayoutContainer>
  );
};

export default UserView;

import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import { ACCESS_TOKEN } from "../constants";
import { RootState } from "../modules";
import { resetUser } from "../modules/user";
import { fetchUserProfile } from "../modules/user/saga";

type LayoutContainerProps = {
  main?: boolean;
  children: React.ReactNode;
};

const LayoutContainer = ({ main = false, children }: LayoutContainerProps) => {
  const login = useSelector((state: RootState) => state.user.login);
  const profile = useSelector((state: RootState) => state.user.profile);

  const dispatch = useDispatch();
  const onClickUser = () => {
    if (login.userId !== profile.userId) dispatch(resetUser());
  };

  const onClickFollow = () => {
    if (login.userId !== profile.userId)
      dispatch(fetchUserProfile({ userId: login.userId }));
  };

  const onClickLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };

  return (
    <Layout
      main={main}
      children={children}
      onClickUser={onClickUser}
      onClickFollow={onClickFollow}
      onClickLogOut={onClickLogOut}
    />
  );
};

export default LayoutContainer;

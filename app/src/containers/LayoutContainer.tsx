import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import { RootState } from "../modules";
import { resetUser } from "../modules/user";
import { fetchUserProfile } from "../modules/user/saga";

type LayoutContainerProps = {
  children: React.ReactNode;
};

const LayoutContainer = ({ children }: LayoutContainerProps) => {
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

  return (
    <Layout
      children={children}
      onClickUser={onClickUser}
      onClickFollow={onClickFollow}
    />
  );
};

export default LayoutContainer;

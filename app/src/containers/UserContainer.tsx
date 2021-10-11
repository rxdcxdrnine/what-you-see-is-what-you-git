import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/User";
import { RootState } from "../modules";
import { getGithubProfile } from "../modules/user/saga";

const UserContainer = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(getGithubProfile(username));
  }, [dispatch]);
  return (
    <>
      <User profile={profile} />
    </>
  );
};

export default UserContainer;

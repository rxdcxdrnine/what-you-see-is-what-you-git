import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/user";
import { RootState } from "../modules";
import {
  fetchGistPosts,
  fetchGithubProfile,
  fetchImagePosts,
  fetchPushPosts,
} from "../modules/user/saga";

const UserContainer = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const { status, pushPosts, gistPosts, imagePosts } = useSelector(
    (state: RootState) => state.user.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(fetchGithubProfile(username));
  }, [dispatch]);

  const onClickCategory = (e: any) => {
    if (e.target.name === "push") {
      dispatch(fetchPushPosts(profile.userId));
    } else if (e.target.name === "gist") {
      dispatch(fetchGistPosts(profile.userId));
    } else {
      dispatch(fetchImagePosts(profile.userId));
    }
  };

  return (
    <User
      profile={profile}
      status={status}
      pushPosts={pushPosts}
      gistPosts={gistPosts}
      imagePosts={imagePosts}
      onClickCategory={onClickCategory}
    />
  );
};

export default UserContainer;

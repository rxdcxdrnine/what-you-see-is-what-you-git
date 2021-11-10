import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/user";
import { RootState } from "../modules";
import {
  fetchGistPosts,
  fetchGithubProfile,
  fetchImagePosts,
  fetchPushPosts,
  fetchCommits,
  fetchPostCount,
  fetchAllPosts,
} from "../modules/user/saga";

export type ComponentState =
  | "all"
  | "push"
  | "gist"
  | "image"
  | "day"
  | "heatmap";

const UserContainer = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const { allPosts, pushPosts, gistPosts, imagePosts, commits } = useSelector(
    (state: RootState) => state.user.posts
  );
  const heatmap = useSelector((state: RootState) => state.user.heatmap);
  const dispatch = useDispatch();

  const [component, setComponent] = useState<ComponentState>("heatmap");

  useEffect(() => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(fetchGithubProfile(username));
    dispatch(fetchPostCount(profile.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickComponent = (component: ComponentState) => {
    setComponent(component);

    if (component === "all") {
      dispatch(fetchAllPosts({ userId: profile.userId }));
    } else if (component === "push") {
      dispatch(fetchPushPosts(profile.userId));
    } else if (component === "gist") {
      dispatch(fetchGistPosts(profile.userId));
    } else if (component === "image") {
      dispatch(fetchImagePosts(profile.userId));
    } else if (component === "heatmap") {
      dispatch(fetchPostCount(profile.userId));
    }
  };

  const onClickDay = (userId: number, regDate: string) => {
    setComponent("day");
    dispatch(fetchAllPosts({ userId, regDate }));
  };

  const onClickModal = (postId: number) => {
    dispatch(fetchCommits(postId));
  };

  return (
    <User
      profile={profile}
      component={component}
      allPosts={allPosts}
      pushPosts={pushPosts}
      gistPosts={gistPosts}
      imagePosts={imagePosts}
      commits={commits}
      heatmap={heatmap}
      onClickDay={onClickDay}
      onClickModal={onClickModal}
      onClickComponent={onClickComponent}
    />
  );
};

export default UserContainer;

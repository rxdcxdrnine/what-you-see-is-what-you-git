import { useEffect, useState } from "react";
import User from "../components/user";
import { RootState } from "../modules";
import { resetFollow } from "../modules/follow";
import {
  fetchGistPosts,
  fetchImagePosts,
  fetchPushPosts,
  fetchCommits,
  fetchPostCount,
  fetchAllPosts,
  fetchUserProfile,
  removePost,
} from "../modules/user/saga";
import { useAppDispatch, useAppSelector } from "../utils/hook";

export type UserComponentState =
  | "all"
  | "push"
  | "gist"
  | "image"
  | "day"
  | "heatmap";

export type UserContainerProps = {
  userId: number | null;
};

const UserContainer = ({ userId }: UserContainerProps) => {
  const login = useAppSelector((state: RootState) => state.user.login);
  const profile = useAppSelector((state: RootState) => state.user.profile);
  const { allPosts, pushPosts, gistPosts, imagePosts, commits } =
    useAppSelector((state: RootState) => state.user.posts);
  const heatmap = useAppSelector((state: RootState) => state.user.heatmap);
  const dispatch = useAppDispatch();

  const [component, setComponent] = useState<UserComponentState>("heatmap");
  const [readOnly, setReadonly] = useState<boolean>(false);

  useEffect(() => {
    const current = userId ? userId : login.userId;
    dispatch(fetchUserProfile({ userId: current }));
    setReadonly(login.userId !== userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, login.userId]);

  const onClickComponent = (component: UserComponentState) => {
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

  const onClickDay = (regDate: string) => {
    setComponent("day");
    dispatch(fetchAllPosts({ userId: profile.userId, regDate }));
  };

  const onClickModal = (postId: number) => {
    dispatch(fetchCommits(postId));
  };

  const onClickDelete = (postId: number) => {
    if (window.confirm("포스트를 삭제하시겠습니까?")) {
      dispatch(removePost(postId));
    }
  };

  const onClickFollow = () => {
    dispatch(resetFollow());
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
      readOnly={readOnly}
      onClickDay={onClickDay}
      onClickModal={onClickModal}
      onClickComponent={onClickComponent}
      onClickDelete={onClickDelete}
      onClickFollow={onClickFollow}
    />
  );
};

export default UserContainer;

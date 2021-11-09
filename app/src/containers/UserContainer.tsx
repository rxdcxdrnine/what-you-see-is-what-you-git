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
} from "../modules/user/saga";

const UserContainer = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const { status, pushPosts, gistPosts, imagePosts, commits } = useSelector(
    (state: RootState) => state.user.posts
  );
  const heatmap = useSelector((state: RootState) => state.user.heatmap);
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(fetchGithubProfile(username));
    dispatch(fetchPostCount(profile.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickButton = (e: any) => {
    if (e.target.name === "push") {
      dispatch(fetchPushPosts(profile.userId));
    } else if (e.target.name === "gist") {
      dispatch(fetchGistPosts(profile.userId));
    } else if (e.target.name === "image") {
      dispatch(fetchImagePosts(profile.userId));
    } else if (e.target.name === "map") {
      dispatch(fetchPostCount(profile.userId));
    }
  };

  const onOpenModal = (postId: number) => {
    setIsOpenModal(true);
    if (status === "push") {
      dispatch(fetchCommits(postId));
    }
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <User
      profile={profile}
      status={status}
      pushPosts={pushPosts}
      gistPosts={gistPosts}
      imagePosts={imagePosts}
      commits={commits}
      heatmap={heatmap}
      isOpenModal={isOpenModal}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onClickButton={onClickButton}
    />
  );
};

export default UserContainer;

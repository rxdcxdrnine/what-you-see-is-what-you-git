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
} from "../modules/user/saga";

const UserContainer = () => {
  const profile = useSelector((state: RootState) => state.user.profile);
  const { status, pushPosts, gistPosts, imagePosts, commits } = useSelector(
    (state: RootState) => state.user.posts
  );
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(fetchGithubProfile(username));
  }, [dispatch]);

  const onClickButton = (e: any) => {
    if (e.target.name === "push") {
      dispatch(fetchPushPosts(profile.userId));
    } else if (e.target.name === "gist") {
      dispatch(fetchGistPosts(profile.userId));
    } else {
      dispatch(fetchImagePosts(profile.userId));
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
      isOpenModal={isOpenModal}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onClickButton={onClickButton}
    />
  );
};

export default UserContainer;

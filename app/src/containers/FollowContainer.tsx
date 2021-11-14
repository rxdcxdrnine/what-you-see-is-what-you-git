import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Follow from "../components/follow";
import { RootState } from "../modules";
import { resetFollow, updateUsers } from "../modules/follow";
import {
  fetchFollowers,
  fetchFollowings,
  removeFollow,
  saveFollow,
  searchUsers,
} from "../modules/follow/saga";

export type FollowComponentState = "" | "search" | "following" | "follower";

type FollowContainerProps = {
  component: FollowComponentState;
};

const FollowContainer = ({ component }: FollowContainerProps) => {
  const login = useSelector((state: RootState) => state.user.login);
  const profile = useSelector((state: RootState) => state.user.profile);
  const { followings, followers, users } = useSelector(
    (state: RootState) => state.follow
  );
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] =
    useState<FollowComponentState>("");
  const [searchKey, setSearchKey] = useState<string>("");
  const [readOnly, setReadonly] = useState<boolean>(false);

  useEffect(() => {
    onClickComponent(component);
    setReadonly(login.userId !== profile.userId);

    return () => {
      dispatch(resetFollow());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.userId]);

  const onClickComponent = (component: FollowComponentState) => {
    if (selectedButton === "search") {
      dispatch(updateUsers([]));
    }
    setSelectedButton(component);

    if (component === "following") {
      dispatch(fetchFollowings(profile.userId));
    } else if (component === "follower") {
      dispatch(fetchFollowers(profile.userId));
    }
  };

  const onClickSearch = (userName: string) => {
    dispatch(searchUsers({ userId: profile.userId, userName }));
  };

  const onClickAdd = (followingId: number, followerId: number) => {
    dispatch(saveFollow({ followingId, followerId }));
    setSearchKey("");
  };

  const onClickRemove = (userId: number, followId: number) => {
    dispatch(removeFollow({ userId, followId }));
  };

  return (
    <Follow
      users={users}
      followings={followings}
      followers={followers}
      userId={profile.userId}
      searchKey={searchKey}
      selectedButton={selectedButton}
      readOnly={readOnly}
      onClickComponent={onClickComponent}
      onClickSearch={onClickSearch}
      onClickAdd={onClickAdd}
      onClickRemove={onClickRemove}
      setSearchKey={setSearchKey}
    />
  );
};

export default FollowContainer;

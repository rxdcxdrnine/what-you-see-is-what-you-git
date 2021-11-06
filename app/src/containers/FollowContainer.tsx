import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Follow from "../components/follow";
import { RootState } from "../modules";
import { updateUsers } from "../modules/follow";
import {
  fetchFollowers,
  fetchFollowings,
  removeFollow,
  saveFollow,
  searchUsers,
} from "../modules/follow/saga";
import "../styles/follow.css";

const FollowContainer = () => {
  const { followings, followers, users } = useSelector(
    (state: RootState) => state.follow
  );
  const { userId } = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] = useState<
    "search" | "following" | "follower"
  >("search");
  const [searchKey, setSearchKey] = useState<string>("");

  const onClickButton = (e: any) => {
    if (selectedButton === "search") {
      dispatch(updateUsers([]));
    }

    const button: "search" | "following" | "follower" = e.target.name;
    setSelectedButton(button);

    if (e.target.name === "following") {
      dispatch(fetchFollowings(userId));
    }
    if (e.target.name === "follower") {
      dispatch(fetchFollowers(userId));
    }
  };

  const onClickSearch = (username: string) => {
    dispatch(searchUsers(username));
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
      userId={userId}
      searchKey={searchKey}
      selectedButton={selectedButton}
      onClickButton={onClickButton}
      onClickSearch={onClickSearch}
      onClickAdd={onClickAdd}
      onClickRemove={onClickRemove}
      setSearchKey={setSearchKey}
    />
  );
};

export default FollowContainer;

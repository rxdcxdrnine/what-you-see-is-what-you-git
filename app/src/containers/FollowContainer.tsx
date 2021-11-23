import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Follow from "../components/follow";
import { RootState } from "../modules";
import { resetFollow, resetPage, resetUsers } from "../modules/follow";
import {
  fetchFollowers,
  fetchFollowings,
  removeFollow,
  saveFollow,
  searchUsers,
} from "../modules/follow/saga";
import { updateLogin, updateProfileId } from "../modules/user";
import { getPayload } from "../utils";

export type FollowComponentState = "" | "search" | "following" | "follower";

type FollowContainerProps = {
  component: FollowComponentState;
};

const FollowContainer = ({ component }: FollowContainerProps) => {
  const { login, profile, readOnly } = useSelector(
    (state: RootState) => state.user
  );
  const { followings, followers, users, page } = useSelector(
    (state: RootState) => state.follow
  );
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] =
    useState<FollowComponentState>("");
  const [searchKey, setSearchKey] = useState<string>("");

  useEffect(() => {
    if (!login.userId || !login.userName) {
      const { userId, userName } = getPayload();
      dispatch(updateLogin({ userId, userName }));
      dispatch(updateProfileId(userId));
    }

    onClickComponent(component);

    return () => {
      dispatch(resetFollow());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickComponent = (component: FollowComponentState) => {
    if (selectedButton === "search") {
      dispatch(resetUsers());
      dispatch(resetPage());
    }

    if (selectedButton === component) return;
    setSelectedButton(component);
    dispatch(resetPage());

    if (component === "following") {
      dispatch(fetchFollowings(profile.userId));
    } else if (component === "follower") {
      dispatch(fetchFollowers(profile.userId));
    }
  };

  const onClickSearch = (userName: string) => {
    // if (userName.length < 2) {
    //   alert("2글자 이상을 입력하세요.");
    //   return;
    // }
    setSearchKey(userName);
    dispatch(searchUsers({ userId: profile.userId, userName }));
  };

  const onClickMore = (e: any) => {
    dispatch(
      searchUsers({
        userId: profile.userId,
        userName: searchKey,
        page: page.number + 1,
      })
    );
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
      page={page}
      readOnly={readOnly}
      onClickComponent={onClickComponent}
      onClickSearch={onClickSearch}
      onClickMore={onClickMore}
      onClickAdd={onClickAdd}
      onClickRemove={onClickRemove}
      setSearchKey={setSearchKey}
    />
  );
};

export default FollowContainer;

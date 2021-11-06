import { FollowItem } from "../../modules/follow";
import FollowHeader from "./FollowHeader";
import FollowItems from "./FollowItems";
import FollowSearch from "./FollowSearch";

type FollowProps = {
  users: FollowItem[];
  followings: FollowItem[];
  followers: FollowItem[];
  userId: number;
  selectedButton: "search" | "following" | "follower";
  searchKey: string;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickSearch: (username: string) => void;
  onClickAdd: (followingId: number, followerId: number) => void;
  onClickRemove: (userId: number, followId: number) => void;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
};

const Follow = ({
  followings,
  followers,
  users,
  userId,
  selectedButton,
  searchKey,
  onClickButton,
  onClickSearch,
  onClickAdd,
  onClickRemove,
  setSearchKey,
}: FollowProps) => {
  return (
    <div className="follow-container">
      <FollowHeader
        selectedButton={selectedButton}
        onClickButton={onClickButton}
      />

      {selectedButton === "search" ? (
        <FollowSearch
          onClickSearch={onClickSearch}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      ) : null}
      <FollowItems
        followings={followings}
        followers={followers}
        users={users}
        userId={userId}
        selectedButton={selectedButton}
        onClickAdd={onClickAdd}
        onClickRemove={onClickRemove}
      />
    </div>
  );
};

export default Follow;

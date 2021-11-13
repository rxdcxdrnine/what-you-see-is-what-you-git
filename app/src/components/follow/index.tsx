import { FollowItem } from "../../modules/follow";
import FollowHeader from "./FollowHeader";
import FollowItems from "./FollowItems";
import FollowSearch from "./FollowSearch";

import "../../styles/follow.css";
import { FollowComponentState } from "../../containers/FollowContainer";

type FollowProps = {
  users: FollowItem[];
  followings: FollowItem[];
  followers: FollowItem[];
  userId: number;
  selectedButton: FollowComponentState;
  searchKey: string;
  readOnly: boolean;
  onClickComponent: (component: FollowComponentState) => void;
  onClickSearch: (userName: string) => void;
  onClickUser: () => void;
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
  readOnly,
  onClickComponent,
  onClickSearch,
  onClickUser,
  onClickAdd,
  onClickRemove,
  setSearchKey,
}: FollowProps) => {
  return (
    <div className="follow-page">
      <div className="follow-page-container">
        <FollowHeader
          selectedButton={selectedButton}
          onClickComponent={onClickComponent}
          readOnly={readOnly}
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
          readOnly={readOnly}
          onClickUser={onClickUser}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
        />
      </div>
    </div>
  );
};

export default Follow;

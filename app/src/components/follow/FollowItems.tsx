import { Link } from "react-router-dom";
import { FollowComponentState } from "../../containers/FollowContainer";
import { FollowItem } from "../../modules/follow";

type FollowItemsProps = {
  users: FollowItem[];
  followings: FollowItem[];
  followers: FollowItem[];
  userId: number;
  selectedButton: FollowComponentState;
  readOnly: boolean;
  onClickUser: () => void;
  onClickAdd: (followingId: number, followerId: number) => void;
  onClickRemove: (userId: number, followId: number) => void;
};

const FollowItems = ({
  followings,
  followers,
  users,
  userId,
  selectedButton,
  readOnly,
  onClickUser,
  onClickAdd,
  onClickRemove,
}: FollowItemsProps) => {
  return (
    <div className="follow-items-container">
      {selectedButton === "search"
        ? users.map((user) => (
            <div className="follow-item-container" key={user.userId}>
              <FollowItemBox follow={user} onClickUser={onClickUser} />
              <button
                className="follow-item-button"
                onClick={() => onClickAdd(userId, user.userId)}
              >
                FOLLOW
              </button>
            </div>
          ))
        : selectedButton === "following"
        ? followings.map((following) => (
            <div className="follow-item-container" key={following.followId}>
              <FollowItemBox follow={following} onClickUser={onClickUser} />
              {readOnly ? null : (
                <button
                  className="follow-item-button"
                  onClick={() => onClickRemove(userId, following.followId)}
                >
                  UNFOLLOW
                </button>
              )}
            </div>
          ))
        : followers.map((follower) => (
            <div className="follow-item-container" key={follower.followId}>
              <FollowItemBox follow={follower} onClickUser={onClickUser} />
            </div>
          ))}
    </div>
  );
};

type FollowItemBoxProps = {
  follow: FollowItem;
  onClickUser: (userId: number) => void;
};

const FollowItemBox = ({ follow, onClickUser }: FollowItemBoxProps) => {
  return (
    <Link
      to={{ pathname: "/user", state: { userId: follow.userId } }}
      className="text-link"
      onClick={() => onClickUser(follow.userId)}
    >
      <div className="follow-item-wrapper">
        <img
          className="follow-item-image"
          alt="follow-profile"
          src={follow.avatarUrl}
        />
        <div className="follow-item">
          <div>
            <div>{follow.userName}</div>
            <div>{follow.profileName}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FollowItems;

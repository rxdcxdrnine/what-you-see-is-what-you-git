import { FollowItem } from "../../modules/follow";

type FollowItemsProps = {
  users: FollowItem[];
  followings: FollowItem[];
  followers: FollowItem[];
  userId: number;
  selectedButton: "search" | "following" | "follower";
  onClickAdd: (followingId: number, followerId: number) => void;
  onClickRemove: (userId: number, followId: number) => void;
};

const FollowItems = ({
  followings,
  followers,
  users,
  userId,
  selectedButton,
  onClickAdd,
  onClickRemove,
}: FollowItemsProps) => {
  return (
    <div className="follow-items-container">
      {selectedButton === "search"
        ? users.map((user) =>
            userId !== user.userId ? (
              <div className="follow-item-wrapper" key={user.userId}>
                <img
                  className="follow-item-image"
                  alt="follow-profile"
                  src={user.avatarUrl}
                />
                <div className="follow-item">
                  <div>{user.userId}</div>
                  <div>{user.userName}</div>
                  <div>{user.profileName}</div>
                </div>
                <button
                  className="follow-item-button"
                  onClick={() => onClickAdd(userId, user.userId)}
                >
                  ADD
                </button>
              </div>
            ) : null
          )
        : selectedButton === "following"
        ? followings.map((following) => (
            <div className="follow-item-wrapper" key={following.followId}>
              <img
                className="follow-item-image"
                alt="follow-profile"
                src={following.avatarUrl}
              />
              <div className="follow-item">
                <div>{following.userId}</div>
                <div>{following.userName}</div>
                <div>{following.profileName}</div>
              </div>
              <button
                className="follow-item-button"
                onClick={() => onClickRemove(userId, following.followId)}
              >
                UNFOLLOW
              </button>
            </div>
          ))
        : followers.map((follower) => (
            <div className="follow-item-wrapper" key={follower.followId}>
              <img
                className="follow-item-image"
                alt="follow-profile"
                src={follower.avatarUrl}
              />
              <div className="follow-item">
                <div>{follower.userId}</div>
                <div>{follower.userName}</div>
                <div>{follower.profileName}</div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default FollowItems;

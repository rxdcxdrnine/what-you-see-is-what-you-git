import { Link } from "react-router-dom";
import { UserComponentState } from "../../../containers/UserContainer";
import { ProfileState } from "../../../modules/user";

type CountProps = {
  profile: ProfileState;
  onClickComponent: (component: UserComponentState) => void;
};

const Count = ({ profile, onClickComponent }: CountProps) => {
  return (
    <>
      <div className="count-container">
        <div
          className="count-wrapper"
          onClick={() => onClickComponent("heatmap")}
          style={{ cursor: "pointer" }}
        >
          <h4>DAYS</h4>
          <p>{profile.dayNum}</p>
        </div>
        <Link
          to={{ pathname: "/follow", state: { component: "following" } }}
          className="text-link"
        >
          <div className="count-wrapper">
            <h4>FOLLOWINGS</h4>
            <p>{profile.followingNum}</p>
          </div>
        </Link>
        <Link
          to={{ pathname: "/follow", state: { component: "follower" } }}
          className="text-link"
        >
          <div className="count-wrapper">
            <h4>FOLLOWERS</h4>
            <p>{profile.followerNum}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Count;

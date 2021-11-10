import { ProfileState } from "../../../modules/user";

type CountProps = {
  profile: ProfileState;
};

const Count = ({ profile }: CountProps) => {
  return (
    <>
      <div className="count-container">
        <div className="count-wrapper">
          <h4>DAYS</h4>
          <p>{profile.dayNum}</p>
        </div>
        <div className="count-wrapper">
          <h4>FOLLOWINGS</h4>
          <p>{profile.followingNum}</p>
        </div>
        <div className="count-wrapper">
          <h4>FOLLOWERS</h4>
          <p>{profile.followerNum}</p>
        </div>
      </div>
    </>
  );
};

export default Count;

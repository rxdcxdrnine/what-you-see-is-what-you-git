import { ProfileState } from "../../modules/user";
import Count from "./Count";
import Grass from "./Grass";

import "../../styles/user.css";

type ProfileProps = {
  profile: ProfileState;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile-left">
        <img className="profile-image" src={profile.avatarUrl} alt="profile" />
        <div>{profile.userName}</div>
        <div>{profile.profileName}</div>
      </div>
      <div className="profile-right">
        <Grass />
        <Count
          dayNum={profile.dayNum}
          followingNum={profile.followingNum}
          followerNum={profile.followerNum}
        />
      </div>
    </div>
  );
};

export default Profile;

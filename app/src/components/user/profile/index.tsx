import { ProfileState } from "../../../modules/user";
import Count from "./Count";

type ProfileProps = {
  profile: ProfileState;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile-left">
        <img className="profile-image" src={profile.avatarUrl} alt="profile" />
      </div>
      <div className="profile-right">
        <div className="profile-name">
          {profile.userName} / {profile.profileName}
        </div>
        <Count profile={profile} />
      </div>
    </div>
  );
};

export default Profile;

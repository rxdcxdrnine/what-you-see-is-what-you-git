import { ProfileState, UserComponentState } from "../../../modules/user";
import Count from "./Count";

type ProfileProps = {
  profile: ProfileState;
  onClickComponent: (component: UserComponentState) => void;
};

const Profile = ({ profile, onClickComponent }: ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile-left">
        <img className="profile-image" src={profile.avatarUrl} alt=" " />
      </div>
      <div className="profile-right">
        <div className="profile-name">
          {profile.userName} / {profile.profileName}
        </div>
        <Count profile={profile} onClickComponent={onClickComponent} />
      </div>
    </div>
  );
};

export default Profile;

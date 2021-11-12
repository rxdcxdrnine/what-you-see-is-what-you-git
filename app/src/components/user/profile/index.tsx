import { UserComponentState } from "../../../containers/UserContainer";
import { ProfileState } from "../../../modules/user";
import Count from "./Count";

type ProfileProps = {
  profile: ProfileState;
  onClickComponent: (component: UserComponentState) => void;
  onClickFollow: () => void;
};

const Profile = ({
  profile,
  onClickComponent,
  onClickFollow,
}: ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile-left">
        <img className="profile-image" src={profile.avatarUrl} alt=" " />
      </div>
      <div className="profile-right">
        <div className="profile-name">
          {profile.userName} / {profile.profileName}
        </div>
        <Count
          profile={profile}
          onClickComponent={onClickComponent}
          onClickFollow={onClickFollow}
        />
      </div>
    </div>
  );
};

export default Profile;

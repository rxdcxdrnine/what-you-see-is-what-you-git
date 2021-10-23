import { ProfileState } from "../../modules/user";
import Post from "./Post";
import Profile from "./Profile";

import "../../styles/user.css";

type UserProps = {
  profile: ProfileState;
};

const User = ({ profile }: UserProps) => {
  return (
    <div className="user-container">
      <Profile profile={profile} />
      <Post />
    </div>
  );
};

export default User;

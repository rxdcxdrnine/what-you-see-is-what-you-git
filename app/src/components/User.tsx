import { ProfileState } from "../modules/user";
import "../styles/user.css";

type userProps = {
  profile: ProfileState;
};

const User = ({ profile }: userProps) => {
  return (
    <div className="user-container">
      <div className="profile-container">
        <div className="profile-left">
          <img
            className="profile-image"
            src={profile.avatarUrl}
            alt="profile"
          />
          <div>{profile.userName}</div>
          <div>{profile.profileName}</div>
        </div>
        <div className="profile-right">
          <div className="grass-wrapper">
            <div className="grass">grass</div>
          </div>
          <div className="count-wrapper">
            <div className="count">
              <h3>DAYS</h3>
              <p>{profile.dayNum}</p>
            </div>
            <div className="count">
              <h3>FOLLOWINGS</h3>
              <p>{profile.followingNum}</p>
            </div>
            <div className="count">
              <h3>FOLLOWERS</h3>
              <p>{profile.followerNum}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="button-wrapper">
          <div className="button">PUSHS</div>
          <div className="button">GISTS</div>
          <div className="button">IMAGES</div>
        </div>
        <div className="main-wrapper">
          <div className="post-wrapper">
            <div className="post">POST</div>
          </div>
          <div className="post-wrapper">
            <div className="post">POST</div>
          </div>
          <div className="post-wrapper">
            <div className="post">POST</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

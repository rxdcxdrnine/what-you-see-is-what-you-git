import {
  GistPostState,
  ImagePostState,
  ProfileState,
  PushPostState,
} from "../../modules/user";
import Post from "./Post";
import Profile from "./Profile";

import "../../styles/user.css";

type UserProps = {
  profile: ProfileState;
  status: "all" | "push" | "gist" | "image";
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  onClickCategory: React.MouseEventHandler<HTMLButtonElement>;
};

const User = ({
  profile,
  status,
  pushPosts,
  gistPosts,
  imagePosts,
  onClickCategory,
}: UserProps) => {
  return (
    <div className="user-container">
      <Profile profile={profile} />
      <Post
        status={status}
        username={profile.userName}
        pushPosts={pushPosts}
        gistPosts={gistPosts}
        imagePosts={imagePosts}
        onClickCategory={onClickCategory}
      />
    </div>
  );
};

export default User;

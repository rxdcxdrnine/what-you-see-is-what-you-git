import {
  commitState,
  GistPostState,
  ImagePostState,
  ProfileState,
  PushPostState,
} from "../../modules/user";
import Post from "./Post";
import Profile from "./Profile";

type UserProps = {
  profile: ProfileState;
  status: "all" | "push" | "gist" | "image";
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const User = ({
  profile,
  status,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickButton,
}: UserProps) => {
  return (
    <>
      <Profile profile={profile} />
      <Post
        status={status}
        pushPosts={pushPosts}
        gistPosts={gistPosts}
        imagePosts={imagePosts}
        commits={commits}
        isOpenModal={isOpenModal}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        onClickButton={onClickButton}
      />
    </>
  );
};

export default User;

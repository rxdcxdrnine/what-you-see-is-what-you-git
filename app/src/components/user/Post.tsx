import {
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../modules/user";

import "../../styles/user.css";
import { GistPosts, ImagePosts, PushPosts } from "./PostItems";

type PostProps = {
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

const Post = ({
  status,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickButton,
}: PostProps) => {
  return (
    <div className="post-container">
      <div className="button-wrapper">
        <button name="push" className="button" onClick={onClickButton}>
          PUSHS
        </button>
        <button name="gist" className="button" onClick={onClickButton}>
          GISTS
        </button>
        <button name="image" className="button" onClick={onClickButton}>
          IMAGES
        </button>
      </div>
      {status === "push" ? (
        <PushPosts
          pushPosts={pushPosts}
          commits={commits}
          isOpenModal={isOpenModal}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
        />
      ) : status === "gist" ? (
        <GistPosts gistPosts={gistPosts} />
      ) : status === "image" ? (
        <ImagePosts imagePosts={imagePosts} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Post;

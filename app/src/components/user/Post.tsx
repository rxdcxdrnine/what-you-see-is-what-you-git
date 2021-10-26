import {
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../modules/user";

import "../../styles/user.css";
import { GistPosts, ImagePosts, PushPosts } from "./PostItems";

type PostProps = {
  status: "all" | "push" | "gist" | "image";
  username: string;
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  onClickCategory: React.MouseEventHandler<HTMLButtonElement>;
};

const Post = ({
  status,
  username,
  pushPosts,
  gistPosts,
  imagePosts,
  onClickCategory,
}: PostProps) => {
  return (
    <div className="post-container">
      <div className="button-wrapper">
        <button name="push" className="button" onClick={onClickCategory}>
          PUSHS
        </button>
        <button name="gist" className="button" onClick={onClickCategory}>
          GISTS
        </button>
        <button name="image" className="button" onClick={onClickCategory}>
          IMAGES
        </button>
      </div>
      {status === "push" ? (
        <PushPosts pushPosts={pushPosts} />
      ) : status === "gist" ? (
        <GistPosts gistPosts={gistPosts} username={username} />
      ) : status === "image" ? (
        <ImagePosts imagePosts={imagePosts} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Post;

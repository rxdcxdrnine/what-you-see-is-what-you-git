import {
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../../modules/user";
import { GistPosts, ImagePosts, PushPosts } from "./PostItems";

type PostListProps = {
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

const PostList = ({
  status,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickButton,
}: PostListProps) => {
  return (
    <>
      <div className="button-container">
        <button
          name="push"
          className="button"
          onClick={onClickButton}
          style={{
            backgroundColor: status === "push" ? "#e9ecef" : "#ffffff",
          }}
        >
          PUSHS
        </button>
        <button
          name="gist"
          className="button"
          onClick={onClickButton}
          style={{
            backgroundColor: status === "gist" ? "#e9ecef" : "#ffffff",
          }}
        >
          GISTS
        </button>
        <button
          name="image"
          className="button"
          onClick={onClickButton}
          style={{
            backgroundColor: status === "image" ? "#e9ecef" : "#ffffff",
          }}
        >
          IMAGES
        </button>
      </div>
      <div className="post-container">
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
    </>
  );
};

export default PostList;

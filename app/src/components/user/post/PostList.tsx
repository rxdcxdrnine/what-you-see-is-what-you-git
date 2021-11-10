import { ComponentState } from "../../../containers/UserContainer";
import {
  AllPostState,
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../../modules/user";
import {
  AllPostItems,
  GistPostItems,
  ImagePostItems,
  PushPostItems,
} from "./PostItems";

type PostListProps = {
  component: ComponentState;
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

const PostList = ({
  component,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  onClickModal,
  onClickDelete,
}: PostListProps) => {
  return (
    <>
      {component === "all" ? (
        <AllPostItems
          postItems={allPosts}
          commits={commits}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : component === "push" ? (
        <PushPostItems
          pushPostItems={pushPosts}
          commits={commits}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : component === "gist" ? (
        <GistPostItems
          gistPostItems={gistPosts}
          onClickDelete={onClickDelete}
        />
      ) : component === "image" ? (
        <ImagePostItems
          imagePostItems={imagePosts}
          onClickDelete={onClickDelete}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PostList;

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
};

const PostList = ({
  component,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  onClickModal,
}: PostListProps) => {
  return (
    <>
      {component === "all" ? (
        <AllPostItems
          postItems={allPosts}
          commits={commits}
          onClickModal={onClickModal}
        />
      ) : component === "push" ? (
        <PushPostItems
          pushPostItems={pushPosts}
          commits={commits}
          onClickModal={onClickModal}
        />
      ) : component === "gist" ? (
        <GistPostItems gistPostItems={gistPosts} />
      ) : component === "image" ? (
        <ImagePostItems imagePostItems={imagePosts} />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PostList;

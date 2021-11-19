import { UserComponentState } from "../../../containers/UserContainer";
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
  component: UserComponentState;
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  readOnly: boolean;
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
  readOnly,
  onClickModal,
  onClickDelete,
}: PostListProps) => {
  return (
    <>
      {component === "all" ? (
        <AllPostItems
          postItems={allPosts}
          commits={commits}
          readOnly={readOnly}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : component === "push" ? (
        <PushPostItems
          pushPostItems={pushPosts}
          commits={commits}
          readOnly={readOnly}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : component === "gist" ? (
        <GistPostItems
          gistPostItems={gistPosts}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
      ) : component === "image" ? (
        <ImagePostItems
          imagePostItems={imagePosts}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PostList;
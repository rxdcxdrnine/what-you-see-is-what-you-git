import { ComponentState } from "../../../containers/UserContainer";
import {
  AllPostState,
  commitState,
  GistPostState,
  HeatmapState,
  ImagePostState,
  PushPostState,
} from "../../../modules/user";
import Heatmap from "./Heatmap";
import PostList from "./PostList";

type PostProps = {
  userId: number;
  view: "heatmap" | "list";
  component: ComponentState;
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  onClickDay: (regDate: string) => void;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

const Post = ({
  userId,
  view,
  component,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  onClickModal,
  onClickDay,
  onClickDelete,
}: PostProps) => {
  return (
    <>
      {view === "heatmap" ? (
        <Heatmap
          userId={userId}
          component={component}
          heatmap={heatmap}
          allPosts={allPosts}
          commits={commits}
          onClickDay={onClickDay}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : (
        <PostList
          component={component}
          allPosts={allPosts}
          pushPosts={pushPosts}
          gistPosts={gistPosts}
          imagePosts={imagePosts}
          commits={commits}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
};

export default Post;

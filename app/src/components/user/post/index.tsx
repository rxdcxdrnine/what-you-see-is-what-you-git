import { UserComponentState } from "../../../containers/UserContainer";
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
  component: UserComponentState;
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  readOnly: boolean;
  onClickDay: (regDate: string) => void;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

const Post = ({
  userId,
  component,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  readOnly,
  onClickModal,
  onClickDay,
  onClickDelete,
}: PostProps) => {
  return (
    <>
      {component === "day" || component === "heatmap" ? (
        <Heatmap
          userId={userId}
          component={component}
          heatmap={heatmap}
          allPosts={allPosts}
          commits={commits}
          readOnly={readOnly}
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
          readOnly={readOnly}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
};

export default Post;

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
  status: "all" | "push" | "gist" | "image";
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  selectedView: "map" | "list";
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
  onClickDay: (userId: number, regDate: string) => void;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const Post = ({
  userId,
  status,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  selectedView,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickDay,
  onClickButton,
}: PostProps) => {
  return (
    <>
      {selectedView === "map" ? (
        <Heatmap
          userId={userId}
          heatmap={heatmap}
          allPosts={allPosts}
          commits={commits}
          isOpenModal={isOpenModal}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          onClickDay={onClickDay}
        />
      ) : (
        <PostList
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
      )}
    </>
  );
};

export default Post;

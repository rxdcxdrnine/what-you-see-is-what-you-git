import { UserComponentState } from "../../../containers/UserContainer";
import { AllPostState, CommitState, HeatmapState } from "../../../modules/user";
import Heatmap from "./Heatmap";
import { AllPostItem } from "./PostItem";

type PostProps = {
  userId: number;
  component: UserComponentState;
  allPosts: AllPostState[];
  commits: CommitState[];
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
        <div className="post-list-container">
          {allPosts.map((postItem) => (
            <div key={postItem.postId}>
              <AllPostItem
                allPostItem={postItem}
                commits={commits}
                readOnly={readOnly}
                onClickModal={onClickModal}
                onClickDelete={onClickDelete}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Post;

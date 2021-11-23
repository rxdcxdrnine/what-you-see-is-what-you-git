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
          {allPosts.map((postItem, index) => (
            <div key={postItem.postId}>
              {index === 0 ||
              allPosts[index - 1].regDate.split("T")[0] !==
                allPosts[index].regDate.split("T")[0] ? (
                <div
                  className="post-list-date"
                  style={{ marginTop: index !== 0 ? "2rem" : "1rem" }}
                >
                  {allPosts[index].regDate.split("T")[0]}
                </div>
              ) : null}
              <div>
                <AllPostItem
                  allPostItem={postItem}
                  commits={commits}
                  readOnly={readOnly}
                  onClickModal={onClickModal}
                  onClickDelete={onClickDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Post;

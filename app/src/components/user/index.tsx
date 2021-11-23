import {
  AllPostState,
  CommitState,
  HeatmapState,
  PageState,
  ProfileState,
} from "../../modules/user";

import Profile from "./profile";
import Post from "./post";

import "../../styles/user.css";
import { UserComponentState } from "../../containers/UserContainer";

type UserProps = {
  profile: ProfileState;
  component: UserComponentState;
  allPosts: AllPostState[];
  commits: CommitState[];
  heatmap: HeatmapState;
  page: PageState;
  readOnly: boolean;
  onClickPageButton: (e: any) => void;
  onClickDay: (regDate: string) => void;
  onClickModal: (postId: number) => void;
  onClickComponent: (component: UserComponentState) => void;
  onClickDelete: (postId: number) => void;
};

const User = ({
  profile,
  component,
  allPosts,
  commits,
  heatmap,
  page,
  readOnly,
  onClickPageButton,
  onClickDay,
  onClickModal,
  onClickComponent,
  onClickDelete,
}: UserProps) => {
  return (
    <>
      <Profile profile={profile} onClickComponent={onClickComponent} />
      <div className="post-button-container">
        {component === "all" ||
        component === "push" ||
        component === "gist" ||
        component === "image" ? (
          <div className="post-select-container">
            <select className="post-select">
              <option
                defaultValue="all"
                onClick={() => onClickComponent("all")}
              >
                ALL
              </option>
              <option value="push" onClick={() => onClickComponent("push")}>
                PUSH
              </option>
              <option value="gist" onClick={() => onClickComponent("gist")}>
                GIST
              </option>
              <option value="image" onClick={() => onClickComponent("image")}>
                IMAGE
              </option>
            </select>
            <button
              className="post-page-button"
              name="prev"
              disabled={page.first}
              onClick={onClickPageButton}
            >
              PREV
            </button>
            <button
              className="post-page-button"
              name="next"
              disabled={page.last}
              onClick={onClickPageButton}
            >
              NEXT
            </button>
          </div>
        ) : component === "day" ? (
          <div>
            <button
              className="heatmap-back-button"
              onClick={() => onClickComponent("heatmap")}
            >
              {"<- BACK"}
            </button>
            <button
              className="post-page-button"
              name="prev"
              disabled={page.first}
              onClick={onClickPageButton}
            >
              PREV
            </button>
            <button
              className="post-page-button"
              name="next"
              disabled={page.last}
              onClick={onClickPageButton}
            >
              NEXT
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="view-button-container">
          <button
            className="view-button"
            name="heatmap"
            onClick={() => {
              onClickComponent("heatmap");
            }}
            style={{
              backgroundColor:
                component === "day" || component === "heatmap"
                  ? "#e9ecef"
                  : "#ffffff",
            }}
          >
            HEATMAP
          </button>
          <button
            className="view-button"
            name="list"
            onClick={() => {
              onClickComponent("all");
            }}
            style={{
              backgroundColor:
                component === "all" ||
                component === "push" ||
                component === "gist" ||
                component === "image"
                  ? "#e9ecef"
                  : "#ffffff",
            }}
          >
            LIST
          </button>
        </div>
      </div>

      <Post
        userId={profile.userId}
        component={component}
        allPosts={allPosts}
        commits={commits}
        heatmap={heatmap}
        readOnly={readOnly}
        onClickModal={onClickModal}
        onClickDay={onClickDay}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default User;

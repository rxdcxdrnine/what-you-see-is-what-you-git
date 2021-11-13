import {
  AllPostState,
  commitState,
  GistPostState,
  HeatmapState,
  ImagePostState,
  ProfileState,
  PushPostState,
} from "../../modules/user";

import Profile from "./profile";
import Post from "./post";

import "../../styles/user.css";
import { UserComponentState } from "../../containers/UserContainer";

type UserProps = {
  profile: ProfileState;
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
  onClickComponent: (component: UserComponentState) => void;
  onClickDelete: (postId: number) => void;
  onClickFollow: () => void;
};

const User = ({
  profile,
  component,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  readOnly,
  onClickDay,
  onClickModal,
  onClickComponent,
  onClickDelete,
  onClickFollow,
}: UserProps) => {
  return (
    <>
      <Profile
        profile={profile}
        onClickComponent={onClickComponent}
        onClickFollow={onClickFollow}
      />
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
          </div>
        ) : component === "day" ? (
          <button
            className="heatmap-back-button"
            onClick={() => onClickComponent("heatmap")}
          >
            BACK
          </button>
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
        pushPosts={pushPosts}
        gistPosts={gistPosts}
        imagePosts={imagePosts}
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

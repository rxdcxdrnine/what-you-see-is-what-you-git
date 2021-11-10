import { useState } from "react";
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
import { ComponentState } from "../../containers/UserContainer";

type UserProps = {
  profile: ProfileState;
  component: ComponentState;
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  onClickDay: (regDate: string) => void;
  onClickModal: (postId: number) => void;
  onClickComponent: (component: ComponentState) => void;
  onClickDelete: (postId: number) => void;
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
  onClickDay,
  onClickModal,
  onClickComponent,
  onClickDelete,
}: UserProps) => {
  const [view, setView] = useState<"heatmap" | "list">("heatmap");

  return (
    <>
      <Profile profile={profile} />
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
              setView("heatmap");
              onClickComponent("heatmap");
            }}
            style={{
              backgroundColor: view === "heatmap" ? "#e9ecef" : "#ffffff",
            }}
          >
            HEATMAP
          </button>
          <button
            className="view-button"
            name="list"
            onClick={() => {
              setView("list");
              onClickComponent("all");
            }}
            style={{
              backgroundColor: view === "list" ? "#e9ecef" : "#ffffff",
            }}
          >
            LIST
          </button>
        </div>
      </div>

      <Post
        userId={profile.userId}
        view={view}
        component={component}
        allPosts={allPosts}
        pushPosts={pushPosts}
        gistPosts={gistPosts}
        imagePosts={imagePosts}
        commits={commits}
        heatmap={heatmap}
        onClickModal={onClickModal}
        onClickDay={onClickDay}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default User;

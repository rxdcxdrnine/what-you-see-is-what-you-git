import { useState } from "react";
import {
  commitState,
  GistPostState,
  HeatmapState,
  ImagePostState,
  ProfileState,
  PushPostState,
} from "../../modules/user";
import Heatmap from "./Heatmap";
import Post from "./Post";
import Profile from "./Profile";

import "../../styles/user.css";

type UserProps = {
  profile: ProfileState;
  status: "all" | "push" | "gist" | "image";
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const User = ({
  profile,
  status,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  onClickButton,
}: UserProps) => {
  const [selectedView, setSelectedView] = useState<"map" | "list">("map");

  const onClickView = (e: any) => {
    onClickButton(e);
    setSelectedView(e.target.name);
  };

  return (
    <>
      <Profile profile={profile} />
      <div className="view-button-container">
        <button
          className="view-button"
          name="map"
          onClick={onClickView}
          style={{
            backgroundColor: selectedView === "map" ? "#e9ecef" : "#ffffff",
          }}
        >
          HEATMAP
        </button>
        <button
          className="view-button"
          name="list"
          onClick={onClickView}
          style={{
            backgroundColor: selectedView === "list" ? "#e9ecef" : "#ffffff",
          }}
        >
          LIST
        </button>
      </div>

      {selectedView === "map" ? (
        <Heatmap heatmap={heatmap} />
      ) : (
        <Post
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

export default User;

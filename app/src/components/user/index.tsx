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

type UserProps = {
  profile: ProfileState;
  status: "all" | "push" | "gist" | "image";
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  heatmap: HeatmapState;
  isOpenModal: boolean;
  onClickDay: (userId: number, regDate: string) => void;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const User = ({
  profile,
  status,
  allPosts,
  pushPosts,
  gistPosts,
  imagePosts,
  commits,
  heatmap,
  isOpenModal,
  onClickDay,
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

      <Post
        userId={profile.userId}
        status={status}
        allPosts={allPosts}
        pushPosts={pushPosts}
        gistPosts={gistPosts}
        imagePosts={imagePosts}
        commits={commits}
        heatmap={heatmap}
        selectedView={selectedView}
        isOpenModal={isOpenModal}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        onClickDay={onClickDay}
        onClickButton={onClickButton}
      />
    </>
  );
};

export default User;

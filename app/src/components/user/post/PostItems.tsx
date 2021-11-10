import {
  AllPostState,
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../../modules/user";

import {
  GistPostItem,
  ImagePostItem,
  AllPostItem,
  PushPostItem,
} from "./PostItem";

type PostItemsProps = {
  postItems: AllPostState[];
  commits: commitState[];
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const AllPostItems = ({
  postItems,
  commits,
  onClickModal,
  onClickDelete,
}: PostItemsProps) => {
  return (
    <div className="post-list-container">
      {postItems.map((postItem) => (
        <div key={postItem.postId}>
          <AllPostItem
            allPostItem={postItem}
            commits={commits}
            onClickModal={onClickModal}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

type PushPostItemsProps = {
  pushPostItems: PushPostState[];
  commits: commitState[];
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const PushPostItems = ({
  pushPostItems,
  commits,
  onClickModal,
  onClickDelete,
}: PushPostItemsProps) => {
  return (
    <div className="post-list-container">
      {pushPostItems.map((pushPostItem) => (
        <div key={pushPostItem.postId}>
          <PushPostItem
            pushPostItem={pushPostItem}
            commits={commits}
            onClickModal={onClickModal}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

type GistPostItemsProps = {
  gistPostItems: GistPostState[];
  onClickDelete: (postId: number) => void;
};

export const GistPostItems = ({
  gistPostItems,
  onClickDelete,
}: GistPostItemsProps) => {
  return (
    <div className="post-list-container">
      {gistPostItems.map((gistPostItem) => (
        <div key={gistPostItem.postId}>
          <GistPostItem
            gistPostItem={gistPostItem}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

type ImagePostItemsProps = {
  imagePostItems: ImagePostState[];
  onClickDelete: (postId: number) => void;
};

export const ImagePostItems = ({
  imagePostItems,
  onClickDelete,
}: ImagePostItemsProps) => {
  return (
    <div className="post-list-container">
      {imagePostItems.map((imagePostItem) => (
        <div key={imagePostItem.postId}>
          <ImagePostItem
            imagePostItem={imagePostItem}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

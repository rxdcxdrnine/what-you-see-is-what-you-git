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
};

export const AllPostItems = ({
  postItems,
  commits,
  onClickModal,
}: PostItemsProps) => {
  return (
    <div className="post-list-container">
      {postItems.map((postItem) => (
        <div key={postItem.postId}>
          <AllPostItem
            allPostItem={postItem}
            commits={commits}
            onClickModal={onClickModal}
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
};

export const PushPostItems = ({
  pushPostItems,
  commits,
  onClickModal,
}: PushPostItemsProps) => {
  return (
    <div className="post-list-container">
      {pushPostItems.map((pushPostItem) => (
        <div key={pushPostItem.postId}>
          <PushPostItem
            pushPostItem={pushPostItem}
            commits={commits}
            onClickModal={onClickModal}
          />
        </div>
      ))}
    </div>
  );
};

type GistPostItemsProps = {
  gistPostItems: GistPostState[];
};

export const GistPostItems = ({ gistPostItems }: GistPostItemsProps) => {
  return (
    <div className="post-list-container">
      {gistPostItems.map((gistPostItem) => (
        <div key={gistPostItem.postId}>
          <GistPostItem gistPostItem={gistPostItem} />
        </div>
      ))}
    </div>
  );
};

type ImagePostItemsProps = {
  imagePostItems: ImagePostState[];
};

export const ImagePostItems = ({ imagePostItems }: ImagePostItemsProps) => {
  return (
    <div className="post-list-container">
      {imagePostItems.map((imagePostItem) => (
        <div key={imagePostItem.postId}>
          <ImagePostItem imagePostItem={imagePostItem} />
        </div>
      ))}
    </div>
  );
};

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
  readOnly: boolean;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const AllPostItems = ({
  postItems,
  commits,
  readOnly,
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
            readOnly={readOnly}
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
  readOnly: boolean;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const PushPostItems = ({
  pushPostItems,
  commits,
  readOnly,
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
            readOnly={readOnly}
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
  readOnly: boolean;
  onClickDelete: (postId: number) => void;
};

export const GistPostItems = ({
  gistPostItems,
  readOnly,
  onClickDelete,
}: GistPostItemsProps) => {
  return (
    <div className="post-list-container">
      {gistPostItems.map((gistPostItem) => (
        <div key={gistPostItem.postId}>
          <GistPostItem
            gistPostItem={gistPostItem}
            readOnly={readOnly}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

type ImagePostItemsProps = {
  imagePostItems: ImagePostState[];
  readOnly: boolean;
  onClickDelete: (postId: number) => void;
};

export const ImagePostItems = ({
  imagePostItems,
  readOnly,
  onClickDelete,
}: ImagePostItemsProps) => {
  return (
    <div className="post-list-container">
      {imagePostItems.map((imagePostItem) => (
        <div key={imagePostItem.postId}>
          <ImagePostItem
            imagePostItem={imagePostItem}
            readOnly={readOnly}
            onClickDelete={onClickDelete}
          />
        </div>
      ))}
    </div>
  );
};

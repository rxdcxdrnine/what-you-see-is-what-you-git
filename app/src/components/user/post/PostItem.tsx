import { Viewer } from "@toast-ui/react-editor";
import {
  AllPostState,
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../../modules/user";
import Modal from "react-modal";
import Commit from "./Commit";
import Gist from "../../../utils/react-gist/Gist";
import { useState } from "react";

type PostItemProps = {
  allPostItem: AllPostState;
  commits: commitState[];
  onClickModal: (postId: number) => void;
};

export const AllPostItem = ({
  allPostItem,
  commits,
  onClickModal,
}: PostItemProps) => {
  return (
    <>
      {allPostItem.type === "PUSH" ? (
        <PushPostItem
          pushPostItem={allPostItem}
          commits={commits}
          onClickModal={onClickModal}
        />
      ) : allPostItem.type === "GIST" ? (
        <GistPostItem gistPostItem={allPostItem} />
      ) : allPostItem.type === "IMAGE" ? (
        <ImagePostItem imagePostItem={allPostItem} />
      ) : null}
    </>
  );
};

type PushPostItemProps = {
  pushPostItem: AllPostState | PushPostState;
  commits: commitState[];
  onClickModal: (postId: number) => void;
};

export const PushPostItem = ({
  pushPostItem,
  commits,
  onClickModal,
}: PushPostItemProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onOpenModal = (postId: number) => {
    setIsOpenModal(true);
    onClickModal(postId);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "70%",
            height: "70%",
            transform: "translate(-50%, -50%)",
          },
        }}
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={() => onCloseModal()}
      >
        <div className="modal-header">
          <button onClick={() => onCloseModal()}>close</button>
        </div>
        <Commit commits={commits} onCloseModal={onCloseModal} />
      </Modal>
      <div
        key={pushPostItem.postId}
        className="post-wrapper"
        onClick={() => onOpenModal(pushPostItem.postId)}
        style={{ cursor: "pointer" }}
      >
        <div>
          <h2>{pushPostItem.regDate.split("T")[0]}</h2>
          <div>{pushPostItem.pushId}</div>
          <div>{pushPostItem.repoName}</div>
          <div>{pushPostItem.branchName}</div>
        </div>
        <div className="viewer-wrapper">
          <Viewer initialValue={pushPostItem.markdown} />
        </div>
      </div>
    </>
  );
};

type GistPostItemProps = {
  gistPostItem: AllPostState | GistPostState;
};

export const GistPostItem = ({ gistPostItem }: GistPostItemProps) => {
  return (
    <>
      <div key={gistPostItem.postId} className="post-wrapper">
        <div>
          <h2>{gistPostItem.regDate.split("T")[0]}</h2>
          <Gist id={gistPostItem.gistId} />
        </div>
        <div className="viewer-wrapper">
          <Viewer initialValue={gistPostItem.markdown} />
        </div>
      </div>
    </>
  );
};

type ImagePostItemProps = {
  imagePostItem: AllPostState | ImagePostState;
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

export const ImagePostItem = ({ imagePostItem }: ImagePostItemProps) => {
  return (
    <div key={imagePostItem.postId} className="post-wrapper">
      <h2>{imagePostItem.regDate.split("T")[0]}</h2>
      <div className="image-wrapper">
        <img
          className="image-post"
          src={baseUrl + imagePostItem.imageFilename}
          alt="imagePost"
        />
      </div>
      <div className="viewer-wrapper">
        <Viewer initialValue={imagePostItem.markdown} />
      </div>
    </div>
  );
};

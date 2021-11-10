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
import { MdEdit, MdDelete } from "react-icons/md";

type PostItemProps = {
  allPostItem: AllPostState;
  commits: commitState[];
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const AllPostItem = ({
  allPostItem,
  commits,
  onClickModal,
  onClickDelete,
}: PostItemProps) => {
  return (
    <>
      {allPostItem.type === "PUSH" ? (
        <PushPostItem
          pushPostItem={allPostItem}
          commits={commits}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : allPostItem.type === "GIST" ? (
        <GistPostItem
          gistPostItem={allPostItem}
          onClickDelete={onClickDelete}
        />
      ) : allPostItem.type === "IMAGE" ? (
        <ImagePostItem
          imagePostItem={allPostItem}
          onClickDelete={onClickDelete}
        />
      ) : null}
    </>
  );
};

type PushPostItemProps = {
  pushPostItem: AllPostState | PushPostState;
  commits: commitState[];
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const PushPostItem = ({
  pushPostItem,
  commits,
  onClickModal,
  onClickDelete,
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
      <div key={pushPostItem.postId} className="post-wrapper">
        <div className="post-title">
          <h2>{pushPostItem.regDate.split("T")[0]}</h2>
          <div className="post-modify">
            <div>
              <MdEdit className="post-modify-button" size="20" />
              <MdDelete
                className="post-modify-button"
                onClick={() => onClickDelete(pushPostItem.postId)}
                size="20"
              />
            </div>
          </div>
        </div>
        <div
          className="modal-click-area"
          onClick={() => onOpenModal(pushPostItem.postId)}
        >
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
  onClickDelete: (postId: number) => void;
};

export const GistPostItem = ({
  gistPostItem,
  onClickDelete,
}: GistPostItemProps) => {
  return (
    <>
      <div key={gistPostItem.postId} className="post-wrapper">
        <div>
          <div className="post-title">
            <h2>{gistPostItem.regDate.split("T")[0]}</h2>
            <div className="post-modify">
              <div>
                <MdEdit className="post-modify-button" size="20" />
                <MdDelete
                  className="post-modify-button"
                  onClick={() => onClickDelete(gistPostItem.postId)}
                  size="20"
                />
              </div>
            </div>
          </div>
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
  onClickDelete: (postId: number) => void;
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

export const ImagePostItem = ({
  imagePostItem,
  onClickDelete,
}: ImagePostItemProps) => {
  return (
    <div key={imagePostItem.postId} className="post-wrapper">
      <div className="post-title">
        <h2>{imagePostItem.regDate.split("T")[0]}</h2>
        <div className="post-modify">
          <div>
            <MdEdit className="post-modify-button" size="20" />
            <MdDelete
              className="post-modify-button"
              onClick={() => onClickDelete(imagePostItem.postId)}
              size="20"
            />
          </div>
        </div>
      </div>
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

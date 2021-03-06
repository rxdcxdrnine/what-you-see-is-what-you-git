import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Viewer } from "@toast-ui/react-editor";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import { AllPostState, CommitState } from "../../../modules/user";
import Gist from "../../../utils/react-gist/Gist";
import Commit from "./Commit";

type PostItemProps = {
  allPostItem: AllPostState;
  commits: CommitState[];
  readOnly: boolean;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const AllPostItem = ({
  allPostItem,
  commits,
  readOnly,
  onClickModal,
  onClickDelete,
}: PostItemProps) => {
  return (
    <>
      {allPostItem.type === "PUSH" ? (
        <PushPostItem
          pushPostItem={allPostItem}
          commits={commits}
          readOnly={readOnly}
          onClickModal={onClickModal}
          onClickDelete={onClickDelete}
        />
      ) : allPostItem.type === "GIST" ? (
        <GistPostItem
          gistPostItem={allPostItem}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
      ) : allPostItem.type === "IMAGE" ? (
        <ImagePostItem
          imagePostItem={allPostItem}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
      ) : null}
    </>
  );
};

type PushPostItemProps = {
  pushPostItem: AllPostState;
  commits: CommitState[];
  readOnly: boolean;
  onClickModal: (postId: number) => void;
  onClickDelete: (postId: number) => void;
};

export const PushPostItem = ({
  pushPostItem,
  commits,
  readOnly,
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
            width: "50rem",
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
        <PostItemTitle
          postItem={pushPostItem}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
        <div
          className="modal-click-area"
          onClick={() => onOpenModal(pushPostItem.postId)}
        >
          <div>repository: {pushPostItem.repoName}</div>
          <div>branch: {pushPostItem.branchName}</div>
        </div>
        <div className="viewer-wrapper">
          <Viewer initialValue={pushPostItem.markdown} />
        </div>
      </div>
    </>
  );
};

type GistPostItemProps = {
  gistPostItem: AllPostState;
  readOnly: boolean;
  onClickDelete: (postId: number) => void;
};

export const GistPostItem = ({
  gistPostItem,
  readOnly,
  onClickDelete,
}: GistPostItemProps) => {
  return (
    <>
      <div key={gistPostItem.postId} className="post-wrapper">
        <PostItemTitle
          postItem={gistPostItem}
          readOnly={readOnly}
          onClickDelete={onClickDelete}
        />
        <Gist id={gistPostItem.gistId} />
        <div className="viewer-wrapper">
          <Viewer initialValue={gistPostItem.markdown} />
        </div>
      </div>
    </>
  );
};

type ImagePostItemProps = {
  imagePostItem: AllPostState;
  readOnly: boolean;
  onClickDelete: (postId: number) => void;
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

export const ImagePostItem = ({
  imagePostItem,
  readOnly,
  onClickDelete,
}: ImagePostItemProps) => {
  return (
    <div key={imagePostItem.postId} className="post-wrapper">
      <PostItemTitle
        postItem={imagePostItem}
        readOnly={readOnly}
        onClickDelete={onClickDelete}
      />
      <div className="image-wrapper">
        <a
          target="_blank"
          rel="noreferrer"
          href={baseUrl + "/images/" + imagePostItem.imageFilename}
        >
          <img
            className="image-post"
            src={baseUrl + "/images/" + imagePostItem.imageFilename}
            alt="imagePost"
          />
        </a>
      </div>
      <div className="viewer-wrapper">
        <Viewer initialValue={imagePostItem.markdown} />
      </div>
    </div>
  );
};

type PostItemTitleProps = {
  postItem: AllPostState;
  readOnly: boolean;
  onClickDelete: (postid: number) => void;
};

const PostItemTitle = ({
  postItem,
  readOnly,
  onClickDelete,
}: PostItemTitleProps) => {
  return (
    <div className="post-title">
      <h2>
        {postItem.repoName
          ? "[PUSH] " + postItem.repoName
          : postItem.gistDescription
          ? "[GIST] " + postItem.gistDescription
          : "[IMAGE]"}
      </h2>
      {readOnly ? (
        <div></div>
      ) : (
        <div className="post-modify">
          <div>
            <Link
              to={{
                pathname: `/update`,
                state: { postId: postItem.postId },
              }}
              style={{ color: "#000000" }}
            >
              <MdEdit className="post-modify-button" size="20" />
            </Link>
            <MdDelete
              className="post-modify-button"
              onClick={() => onClickDelete(postItem.postId)}
              size="20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import Modal from "react-modal";

import { AllPostState, commitState } from "../../modules/user";
import Gist from "../../utils/react-gist/Gist";
import Commit from "../user/post/Commit";

type UpdatePostProps = {
  post: AllPostState;
  commits: commitState[];
  onClickModal: (postId: number) => void;
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

const UpdatePostItem = ({ post, commits, onClickModal }: UpdatePostProps) => {
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
      {post?.type === "PUSH" ? (
        // PUSH
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
          <div key={post.postId} className="post-wrapper">
            <h2>{post.regDate.split("T")[0]}</h2>
            <div
              className="modal-click-area"
              onClick={() => onOpenModal(post.postId)}
            >
              <div>{post.pushId}</div>
              <div>{post.repoName}</div>
              <div>{post.branchName}</div>
            </div>
          </div>
        </>
      ) : post?.type === "GIST" ? (
        // GIST
        <div key={post.postId} className="post-wrapper">
          <h2>{post.regDate.split("T")[0]}</h2>
          <Gist id={post.gistId} />
        </div>
      ) : post?.type === "IMAGE" ? (
        // IMAGE
        <div key={post.postId} className="post-wrapper">
          <h2>{post.regDate.split("T")[0]}</h2>
          <div className="image-wrapper">
            <img
              className="image-post"
              src={baseUrl + "/images/" + post.imageFilename}
              alt="imagePost"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdatePostItem;

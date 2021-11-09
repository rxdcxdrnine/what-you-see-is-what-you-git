import { Viewer } from "@toast-ui/react-editor";
import { AllPostState, commitState } from "../../../modules/user";
import Modal from "react-modal";
import Commit from "./Commit";
import Gist from "../../../utils/react-gist/Gist";

type PostItemProps = {
  postItem: AllPostState;
  commits: commitState[];
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
};

export const PostItem = ({
  postItem,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
}: PostItemProps) => {
  return (
    <>
      {postItem.type === "PUSH" ? (
        <PushPostItem
          pushPostItem={postItem}
          commits={commits}
          isOpenModal={isOpenModal}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
        />
      ) : postItem.type === "GIST" ? (
        <GistPostItem gistPostItem={postItem} />
      ) : postItem.type === "IMAGE" ? (
        <ImagePostItem imagePostItem={postItem} />
      ) : null}
    </>
  );
};

type PushPostItemProps = {
  pushPostItem: AllPostState;
  commits: commitState[];
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
};

const PushPostItem = ({
  pushPostItem,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
}: PushPostItemProps) => {
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
  gistPostItem: AllPostState;
};

const GistPostItem = ({ gistPostItem }: GistPostItemProps) => {
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
  imagePostItem: AllPostState;
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

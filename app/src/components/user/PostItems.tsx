import { Viewer } from "@toast-ui/react-editor";
import Modal from "react-modal";

import {
  commitState,
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../modules/user";
import Gist from "../../utils/react-gist/Gist";

import Commit from "./Commit";

type PushPostsProps = {
  pushPosts: PushPostState[];
  commits: commitState[];
  isOpenModal: boolean;
  onOpenModal: (postId: number) => void;
  onCloseModal: () => void;
};

export const PushPosts = ({
  pushPosts,
  commits,
  isOpenModal,
  onOpenModal,
  onCloseModal,
}: PushPostsProps) => {
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
      {pushPosts.map((pushPost) => {
        return (
          <div
            key={pushPost.postId}
            className="post-wrapper"
            onClick={() => onOpenModal(pushPost.postId)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h2>{pushPost.regDate.split("T")[0]}</h2>
              <div>{pushPost.pushId}</div>
              <div>{pushPost.repoName}</div>
              <div>{pushPost.branchName}</div>
            </div>
            <div className="viewer-wrapper">
              <Viewer initialValue={pushPost.markdown} />
            </div>
          </div>
        );
      })}
    </>
  );
};

type GistPostsProps = {
  gistPosts: GistPostState[];
};

export const GistPosts = ({ gistPosts }: GistPostsProps) => {
  return (
    <>
      {gistPosts.map((gistPost) => (
        <div key={gistPost.postId} className="post-wrapper">
          <div>
            <h2>{gistPost.regDate.split("T")[0]}</h2>
            <Gist id={gistPost.gistId} />
          </div>
          <div className="viewer-wrapper">
            <Viewer initialValue={gistPost.markdown} />
          </div>
        </div>
      ))}
    </>
  );
};

type ImageProps = {
  imagePosts: ImagePostState[];
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

export const ImagePosts = ({ imagePosts }: ImageProps) => {
  return (
    <>
      {imagePosts.map((imagePost) => (
        <div key={imagePost.postId} className="post-wrapper">
          <h2>{imagePost.regDate.split("T")[0]}</h2>
          <div className="image-wrapper">
            <img
              className="image-post"
              src={baseUrl + imagePost.imageFilename}
              alt="imagePost"
            />
          </div>
          <div className="viewer-wrapper">
            <Viewer initialValue={imagePost.markdown} />
          </div>
        </div>
      ))}
    </>
  );
};

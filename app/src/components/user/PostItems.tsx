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

import "../../styles/user.css";

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
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={() => onCloseModal()}
      >
        <div className="modal-header">
          <button onClick={() => onCloseModal()}>close</button>
        </div>
        <Commit commits={commits} onCloseModal={onCloseModal} />
      </Modal>
      {pushPosts.map((pushPost) => (
        <div
          key={pushPost.postId}
          className="post-wrapper"
          onClick={() => onOpenModal(pushPost.postId)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div>{pushPost.pushId}</div>
            <div>{pushPost.repoName}</div>
            <div>{pushPost.branchName}</div>
            <div>{pushPost.uploadDate}</div>
          </div>
          <div className="viewer-wrapper">
            <Viewer initialValue={pushPost.markdown} />
          </div>
        </div>
      ))}
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
            <Gist id={gistPost.gistId} />
            <div>{gistPost.uploadDate}</div>
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
          <img
            width="300"
            src={baseUrl + imagePost.imageFilename}
            alt="imagePost"
          />
          <div className="viewer-wrapper">
            <Viewer initialValue={imagePost.markdown} />
          </div>
        </div>
      ))}
    </>
  );
};

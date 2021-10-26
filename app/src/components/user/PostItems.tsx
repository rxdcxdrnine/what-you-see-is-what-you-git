import { Viewer } from "@toast-ui/react-editor";
import {
  GistPostState,
  ImagePostState,
  PushPostState,
} from "../../modules/user";

import "../../styles/user.css";
import Gist from "../../utils/react-gist/Gist";

type PushPostsProps = {
  pushPosts: PushPostState[];
};

export const PushPosts = ({ pushPosts }: PushPostsProps) => {
  return (
    <>
      {pushPosts.map((pushPost) => (
        <div key={pushPost.postId} className="post-wrapper">
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
  username: string;
};

export const GistPosts = ({ gistPosts, username }: GistPostsProps) => {
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

import { Viewer } from "@toast-ui/react-editor";
import { PushPostState } from "../../modules/user";

import "../../styles/user.css";

type PushPostsProps = {
  pushPosts: PushPostState[];
};

const PushPosts = ({ pushPosts }: PushPostsProps) => {
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

export default PushPosts;

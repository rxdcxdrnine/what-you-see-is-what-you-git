import { Viewer } from "@toast-ui/react-editor";
import ReactEmbedGist from "react-embed-gist";
import { GistPostState } from "../../modules/user";

import "../../styles/user.css";

type GistPostsProps = {
  gistPosts: GistPostState[];
  username: string;
};

const GistPosts = ({ gistPosts, username }: GistPostsProps) => {
  return (
    <>
      {gistPosts.map((gistPost) => (
        <div key={gistPost.postId} className="post-wrapper">
          <div>
            <ReactEmbedGist gist={`${username}/${gistPost.gistId}`} />
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

export default GistPosts;

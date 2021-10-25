import { Viewer } from "@toast-ui/react-editor";
import { ImagePostState } from "../../modules/user";

import "../../styles/user.css";

type ImageProps = {
  imagePosts: ImagePostState[];
};

const baseUrl: string = process.env.REACT_APP_IMAGE_URL as string;

const ImagePosts = ({ imagePosts }: ImageProps) => {
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

export default ImagePosts;

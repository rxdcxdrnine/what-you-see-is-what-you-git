import { Editor } from "@toast-ui/react-editor";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserApi from "../api/user";
import Update from "../components/update";
import { RootState } from "../modules";
import { AllPostState } from "../modules/user";
import { fetchCommits, updatePost } from "../modules/user/saga";

type UpdateContainerProps = {
  postId: number;
};

const UpdateContainer = ({ postId }: UpdateContainerProps) => {
  const commits = useSelector((state: RootState) => state.user.posts.commits);
  const dispatch = useDispatch();

  const [post, setPost] = useState<AllPostState | null>(null);
  const [markdown, setMarkdown] = useState<string>("");

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    setMarkdown(markdown);
  };

  const onSave = () => {
    dispatch(updatePost({ postId, payload: { markdown } }));
  };

  useEffect(() => {
    UserApi.fetchPost(postId)
      .then((res: AxiosResponse<AllPostState>) => setPost(res.data))
      .catch((e: any) => console.error(e));
  }, [postId]);

  const onClickModal = (postId: number) => {
    dispatch(fetchCommits(postId));
  };

  return (
    <>
      {post ? (
        <Update
          post={post}
          commits={commits}
          onSave={onSave}
          onChangeCreator={onChangeCreator}
          onClickModal={onClickModal}
        />
      ) : null}
    </>
  );
};

export default UpdateContainer;

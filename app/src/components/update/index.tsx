import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import { AllPostState, CommitState } from "../../modules/user";
import UpdatePostItem from "./updateItem";

type UpdateProps = {
  post: AllPostState;
  commits: CommitState[];
  onSave: () => void;
  onClickModal: (postId: number) => void;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Update = ({
  post,
  commits,
  onSave,
  onClickModal,
  onChangeCreator,
}: UpdateProps) => {
  const editorRef = useRef<Editor>(null);
  const [initialValue, setInitialValue] = useState<string>("");

  useEffect(() => {
    setInitialValue(post.markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="update-caution">
        ** 선택한 PUSH / GIST / IMAGE 는 변경할 수 없습니다.
      </div>
      <div className="update-item-container">
        <UpdatePostItem
          post={post}
          commits={commits}
          onClickModal={onClickModal}
        />
      </div>
      {initialValue ? (
        <Editor
          height="450px"
          initialValue={initialValue}
          ref={editorRef}
          onChange={onChangeCreator(editorRef)}
        />
      ) : null}
      <div className="write-footer">
        <button
          className="write-save-button"
          type="submit"
          onClick={() => onSave()}
        >
          SAVE
        </button>
      </div>
    </>
  );
};

export default Update;

import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import { PushState } from "../../modules/write";

import Choose from "./Choose";

import "@toast-ui/editor/dist/toastui-editor.css";
import "../../styles/write.css";

type WriteProps = {
  markdown: string;
  pushes: PushState[];
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onClickItem: (type: string, index: number) => void;
  onClickPushButton: React.MouseEventHandler<HTMLButtonElement>;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Write = ({
  markdown,
  pushes,
  onSave,
  onClickItem,
  onClickPushButton,
  onChangeCreator,
}: WriteProps) => {
  const editorRef = useRef<Editor>(null);
  const [initialValue, setInitialValue] = useState<string>("");

  useEffect(() => {
    setInitialValue(markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="write-container">
      <Choose
        pushes={pushes}
        onClickItem={onClickItem}
        onClickPushButton={onClickPushButton}
      />
      {initialValue ? (
        <Editor
          height="500px"
          initialValue={initialValue}
          ref={editorRef}
          onChange={onChangeCreator(editorRef)}
        />
      ) : null}
      <div className="write-footer">
        <button className="write-save-button" type="submit" onClick={onSave}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Write;

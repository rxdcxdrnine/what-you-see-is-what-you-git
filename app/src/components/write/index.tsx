import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import { PushState } from "../../modules/write";

import Choose from "./Choose";

import "@toast-ui/editor/dist/toastui-editor.css";
import "../../styles/write.css";

type WriteProps = {
  markdown: string;
  pushs: PushState[];
  onClickPushs: React.MouseEventHandler<HTMLButtonElement>;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Write = ({
  markdown,
  pushs,
  onClickPushs,
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
      <Choose pushs={pushs} onClickPushs={onClickPushs} />
      {initialValue ? (
        <Editor
          height="500px"
          initialValue={initialValue}
          ref={editorRef}
          onChange={onChangeCreator(editorRef)}
        />
      ) : null}
      <div className="write-footer">
        <button className="write-save-button">SAVE</button>
      </div>
    </div>
  );
};

export default Write;

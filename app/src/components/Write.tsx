import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";
import "../styles/write.css";

type WriteProps = {
  markdown: string;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Write = ({ markdown, onChangeCreator }: WriteProps) => {
  const editorRef = useRef<Editor>(null);
  const [initialValue, setInitialValue] = useState<string>("");

  useEffect(() => {
    setInitialValue(markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="write-container">
      <div className="choose-container">
        <div className="choose-button-wrapper">
          <div className="choose-button">PUSHS</div>
          <div className="choose-button">GISTS</div>
          <div className="choose-button">IMAGES</div>
        </div>
        <div className="choose-content-container">
          <div>CHOOSE</div>
        </div>
      </div>
      {initialValue ? (
        <Editor
          height="500px"
          initialValue={initialValue}
          ref={editorRef}
          onChange={onChangeCreator(editorRef)}
        />
      ) : null}
      <div className="write-footer" />
    </div>
  );
};

export default Write;

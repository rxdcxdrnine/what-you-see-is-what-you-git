import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";

const Write = () => {
  const editorRef = useRef<Editor>(null);

  const onChange = () => {
    console.log(editorRef.current?.getInstance().getMarkdown());
  };

  return (
    <>
      <div>Write Component</div>
      <Editor ref={editorRef} onChange={onChange} />
    </>
  );
};

export default Write;

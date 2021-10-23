import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import ItemList from "./ItemList";
import { GistState, PushState, SelectedItemState } from "../../modules/write";

import "../../styles/write.css";
import "@toast-ui/editor/dist/toastui-editor.css";

type WriteProps = {
  markdown: string;
  pushes: PushState[];
  gists: GistState[];
  selectedButton: "" | "push" | "gist" | "file";
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickItem: (item: SelectedItemState) => void;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Write = ({
  markdown,
  pushes,
  gists,
  selectedButton,
  onSave,
  onClickItem,
  onClickButton,
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
      <ItemList
        pushes={pushes}
        gists={gists}
        selectedButton={selectedButton}
        onClickItem={onClickItem}
        onClickButton={onClickButton}
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

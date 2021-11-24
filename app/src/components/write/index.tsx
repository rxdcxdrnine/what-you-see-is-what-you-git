import { useEffect, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import ItemList from "./ItemList";
import { GistState, PushState, SelectedItemState } from "../../modules/write";

import "@toast-ui/editor/dist/toastui-editor.css";
import "../../styles/write.css";
import { WriteComponentState } from "../../containers/WriteContainer";

type WriteProps = {
  markdown: string;
  pushes: PushState[];
  gists: GistState[];
  component: WriteComponentState;
  page: number;
  next: boolean;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onClickComponent: (component: WriteComponentState) => void;
  onClickItem: (item: SelectedItemState) => void;
  onClickMore: (page: number) => void;
  onChangeCreator: (editorRef: React.RefObject<Editor>) => () => void;
};

const Write = ({
  markdown,
  pushes,
  gists,
  component,
  page,
  next,
  onSave,
  onClickItem,
  onClickMore,
  onClickComponent,
  onChangeCreator,
}: WriteProps) => {
  const editorRef = useRef<Editor>(null);
  const [initialValue, setInitialValue] = useState<string>("");

  useEffect(() => {
    setInitialValue(markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ItemList
        pushes={pushes}
        gists={gists}
        component={component}
        page={page}
        next={next}
        onClickItem={onClickItem}
        onClickMore={onClickMore}
        onClickComponent={onClickComponent}
      />
      {initialValue ? (
        <Editor
          height="450px"
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
    </>
  );
};

export default Write;

import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/Write";
import { RootState } from "../modules";
import { updateMarkdown } from "../modules/write";

const WriteContainer = () => {
  const { markdown } = useSelector((state: RootState) => state.write);
  const dispatch = useDispatch();

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    dispatch(updateMarkdown(markdown));
  };

  return (
    <>
      <Write markdown={markdown} onChangeCreator={onChangeCreator} />
    </>
  );
};

export default WriteContainer;

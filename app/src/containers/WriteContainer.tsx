import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/write";
import { RootState } from "../modules";
import { updateMarkdown, updateSelectedItem } from "../modules/write";
import { fetchGithubPushes, savePushPost } from "../modules/write/saga";

const WriteContainer = () => {
  const { markdown, pushes, selectedItem } = useSelector(
    (state: RootState) => state.write
  );
  const dispatch = useDispatch();

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    dispatch(updateMarkdown(markdown));
  };

  const onClickPushButton = (e: any) => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(fetchGithubPushes(username));
  };

  const onClickItem = (type: string, index: number) => {
    dispatch(updateSelectedItem({ type, index }));
  };

  const onSave = (e: any) => {
    switch (selectedItem.type) {
      case "PUSH":
        dispatch(savePushPost({ ...pushes[selectedItem.index], markdown }));
        break;
      default:
        break;
    }
  };

  return (
    <Write
      markdown={markdown}
      pushes={pushes}
      onSave={onSave}
      onClickItem={onClickItem}
      onClickPushButton={onClickPushButton}
      onChangeCreator={onChangeCreator}
    />
  );
};

export default WriteContainer;

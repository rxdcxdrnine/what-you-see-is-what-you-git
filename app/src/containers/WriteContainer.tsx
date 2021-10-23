import { Editor } from "@toast-ui/react-editor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/write";
import { RootState } from "../modules";
import {
  SelectedItemState,
  updateMarkdown,
  updateSelectedItem,
} from "../modules/write";
import {
  fetchGithubGists,
  fetchGithubPushes,
  saveGistPost,
  saveImagePost,
  savePushPost,
} from "../modules/write/saga";

const WriteContainer = () => {
  const { markdown, pushes, gists, selectedItem } = useSelector(
    (state: RootState) => state.write
  );
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] = useState<
    "" | "push" | "gist" | "file"
  >("");

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    dispatch(updateMarkdown(markdown));
  };

  const onClickButton = (e: any) => {
    const button: "push" | "gist" | "file" = e.target.name;

    setSelectedButton(button);
    if (selectedButton !== button) {
      dispatch(updateSelectedItem({ type: "", item: null }));
    }

    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    if (button === "push" && pushes.length === 0) {
      dispatch(fetchGithubPushes(username));
    }
    if (button === "gist" && gists.length === 0) {
      dispatch(fetchGithubGists(username));
    }
  };

  const onClickItem = (item: SelectedItemState) => {
    dispatch(updateSelectedItem(item));
  };

  const onSave = (e: any) => {
    if (selectedItem.type === "push") {
      dispatch(savePushPost({ ...selectedItem.item, markdown }));
    }
    if (selectedItem.type === "gist") {
      dispatch(saveGistPost({ ...selectedItem.item, markdown }));
    }
    if (selectedItem.type === "file") {
      dispatch(saveImagePost({ image: selectedItem.item, markdown }));
    }
  };

  return (
    <Write
      markdown={markdown}
      pushes={pushes}
      gists={gists}
      selectedButton={selectedButton}
      onSave={onSave}
      onClickButton={onClickButton}
      onClickItem={onClickItem}
      onChangeCreator={onChangeCreator}
    />
  );
};

export default WriteContainer;

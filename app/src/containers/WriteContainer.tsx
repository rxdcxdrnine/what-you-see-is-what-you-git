import { Editor } from "@toast-ui/react-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/write";
import { RootState } from "../modules";
import {
  resetWrite,
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
import { updateLogin, updateProfileId } from "../modules/user";
import { getPayload } from "../utils";

const WriteContainer = () => {
  const { userId, userName } = useSelector(
    (state: RootState) => state.user.login
  );
  const { markdown, pushes, gists, selectedItem } = useSelector(
    (state: RootState) => state.write
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || !userName) {
      const { userId, userName } = getPayload();
      dispatch(updateLogin({ userId, userName }));
      dispatch(updateProfileId(userId));
    }

    return () => {
      dispatch(resetWrite());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    if (button === "push" && pushes.length === 0) {
      dispatch(fetchGithubPushes(userName));
    }
    if (button === "gist" && gists.length === 0) {
      dispatch(fetchGithubGists(userName));
    }
  };

  const onClickItem = (item: SelectedItemState) => {
    dispatch(updateSelectedItem(item));
  };

  const onSave = (e: any) => {
    if (selectedItem.type === "push") {
      dispatch(savePushPost({ ...selectedItem.item, userId, markdown }));
    }
    if (selectedItem.type === "gist") {
      dispatch(saveGistPost({ ...selectedItem.item, userId, markdown }));
    }
    if (selectedItem.type === "file") {
      dispatch(saveImagePost({ image: selectedItem.item, userId, markdown }));
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

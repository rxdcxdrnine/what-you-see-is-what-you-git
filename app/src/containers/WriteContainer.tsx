import { Editor } from "@toast-ui/react-editor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/write";
import { RootState } from "../modules";
import {
  resetGists,
  resetPushes,
  resetWrite,
  SelectedItemState,
  updateMarkdown,
  updateNext,
  updatePage,
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

export type WriteComponentState = "" | "push" | "gist" | "file";

const WriteContainer = () => {
  const { userId, userName } = useSelector(
    (state: RootState) => state.user.login
  );
  const { markdown, pushes, gists, selectedItem, page, next } = useSelector(
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

  const [component, setComponent] = useState<WriteComponentState>("");

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    dispatch(updateMarkdown(markdown));
  };

  const onClickComponent = (newComponent: WriteComponentState) => {
    setComponent(newComponent);
    if (newComponent !== component) {
      dispatch(updateSelectedItem({ type: "", item: null }));
      dispatch(updatePage(1));
      dispatch(updateNext(true));

      if (newComponent === "push" && pushes.length === 0) {
        dispatch(resetGists());
        dispatch(fetchGithubPushes({ userName, page: 1 }));
      }
      if (newComponent === "gist" && gists.length === 0) {
        dispatch(resetPushes());
        dispatch(fetchGithubGists({ userName, page: 1 }));
      }
    }
  };

  const onClickMore = (page: number) => {
    dispatch(updatePage(page + 1));

    if (component === "push")
      dispatch(fetchGithubPushes({ userName, page: page + 1 }));
    if (component === "gist")
      dispatch(fetchGithubGists({ userName, page: page + 1 }));
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
      component={component}
      page={page}
      next={next}
      onSave={onSave}
      onClickComponent={onClickComponent}
      onClickItem={onClickItem}
      onClickMore={onClickMore}
      onChangeCreator={onChangeCreator}
    />
  );
};

export default WriteContainer;

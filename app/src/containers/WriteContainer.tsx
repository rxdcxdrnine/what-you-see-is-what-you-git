import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";

import Write from "../components/write";
import { RootState } from "../modules";
import { updateMarkdown } from "../modules/write";
import { getGithubPushs } from "../modules/write/saga";

const WriteContainer = () => {
  const { markdown, pushs } = useSelector((state: RootState) => state.write);
  const dispatch = useDispatch();

  const onChangeCreator = (editorRef: React.RefObject<Editor>) => () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || "";
    dispatch(updateMarkdown(markdown));
  };

  const onClickPushs = (e: any) => {
    const username: string = process.env
      .REACT_APP_SAMPLE_GITHUB_USERNAME as string;

    dispatch(getGithubPushs(username));
  };

  return (
    <Write
      markdown={markdown}
      pushs={pushs}
      onClickPushs={onClickPushs}
      onChangeCreator={onChangeCreator}
    />
  );
};

export default WriteContainer;

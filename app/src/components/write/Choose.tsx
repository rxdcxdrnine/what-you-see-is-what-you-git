import { PushState } from "../../modules/write";

type ChooseProps = {
  pushes: PushState[];
  onClickItem: (type: string, index: number) => void;
  onClickPushButton: React.MouseEventHandler<HTMLButtonElement>;
};

const Choose = ({ pushes, onClickItem, onClickPushButton }: ChooseProps) => {
  return (
    <div className="choose-container">
      <div className="choose-button-wrapper">
        <button className="choose-button" onClick={onClickPushButton}>
          PUSHS
        </button>
        <button className="choose-button">GISTS</button>
        <button className="choose-button">IMAGES</button>
      </div>
      <div className="choose-content-container">
        {pushes.map((push, index) => (
          <div
            className="choose-content"
            key={push.pushId}
            onClick={() => onClickItem("PUSH", index)}
          >
            <div>repo name: {push.repoName}</div>
            <div>branch name: {push.branchName}</div>
            <div>commits: {push.commitUrls.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;

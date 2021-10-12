import { PushState } from "../../modules/write";

type ChooseProps = {
  pushs: PushState[];
  onClickPushs: React.MouseEventHandler<HTMLButtonElement>;
};

const Choose = ({ pushs, onClickPushs }: ChooseProps) => {
  return (
    <div className="choose-container">
      <div className="choose-button-wrapper">
        <button className="choose-button" onClick={onClickPushs}>
          PUSHS
        </button>
        <button className="choose-button">GISTS</button>
        <button className="choose-button">IMAGES</button>
      </div>
      <div className="choose-content-container">
        {pushs.map((push) => (
          <div className="choose-content" key={push.pushId}>
            <div>repo name: {push.repoName}</div>
            <div>branch name: {push.branchName}</div>
            <div>commits: {push.commits.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;

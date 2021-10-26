import { PushState, SelectedItemState } from "../../modules/write";

type ItemPushProps = {
  pushes: PushState[];
  onClickItem: (item: SelectedItemState) => void;
};

const ItemPush = ({ pushes, onClickItem }: ItemPushProps) => {
  return (
    <>
      {pushes.map((push) => (
        <div
          className="choose-content"
          key={push.pushId}
          onClick={() => onClickItem({ type: "push", item: push })}
        >
          <div>repo name: {push.repoName}</div>
          <div>branch name: {push.branchName}</div>
        </div>
      ))}
    </>
  );
};

export default ItemPush;

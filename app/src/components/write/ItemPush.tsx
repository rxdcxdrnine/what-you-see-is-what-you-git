import { useState } from "react";
import { PushState, SelectedItemState } from "../../modules/write";

import "../../styles/write.css";

type ItemPushProps = {
  pushes: PushState[];
  onClickItem: (item: SelectedItemState) => void;
};

const ItemPush = ({ pushes, onClickItem }: ItemPushProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      {pushes.map((push, index) => (
        <div
          className="choose-content-wrapper"
          key={push.pushId}
          onClick={() => {
            onClickItem({ type: "push", item: push });
            setSelected(index);
          }}
          style={{
            backgroundColor: index === selected ? "#e9ecef" : "#ffffff",
          }}
        >
          <div className="choose-content">
            <div>repo name: {push.repoName}</div>
            <div>branch name: {push.branchName}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemPush;

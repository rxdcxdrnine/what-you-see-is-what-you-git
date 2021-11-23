import { useState } from "react";
import { PushState, SelectedItemState } from "../../modules/write";

type ItemPushProps = {
  pushes: PushState[];
  onClickItem: (item: SelectedItemState) => void;
};

const toHtmlUrl = (commitUrl: string) => {
  commitUrl = commitUrl.replace("api.", "");
  commitUrl = commitUrl.replace("repos/", "");
  return commitUrl
    .split("/")
    .reverse()
    .join("/")
    .replace(new RegExp("commits"), "commit")
    .split("/")
    .reverse()
    .join("/");
};

const ItemPush = ({ pushes, onClickItem }: ItemPushProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      {pushes.map((push, index) => (
        <div key={push.pushId}>
          {index === 0 ||
          pushes[index - 1].uploadDate.split("T")[0] !==
            pushes[index].uploadDate.split("T")[0] ? (
            <div
              className="choose-content-date"
              style={{ marginTop: index !== 0 ? "2rem" : "" }}
            >
              {pushes[index].uploadDate.split("T")[0]}
            </div>
          ) : null}
          <div
            className="choose-content-wrapper"
            onClick={() => {
              onClickItem({ type: "push", item: push });
              setSelected(index);
            }}
            style={{
              backgroundColor: index === selected ? "#e9ecef" : "#ffffff",
            }}
          >
            <div className="choose-content">
              <div className="choose-content-text">
                <div>repo name: {push.repoName}</div>
                <div>branch name: {push.branchName}</div>
                <div>&nbsp;</div>

                <div>commit messages :</div>
                {push.commitMessages.map((commitMessage, index) => (
                  <div key={index}>
                    {index + 1}.{commitMessage}
                  </div>
                ))}
              </div>
              <div className="choose-content-link-container">
                <a
                  className="text-link choose-content-link"
                  target="_blank"
                  rel="noreferrer"
                  href={toHtmlUrl(push.commitUrls[0])}
                >
                  <button className="choose-content-button">LINK</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemPush;

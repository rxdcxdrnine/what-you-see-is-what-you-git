import { useState } from "react";
import { GistState, SelectedItemState } from "../../modules/write";

type ItemGistProps = {
  gists: GistState[];
  onClickItem: (item: SelectedItemState) => void;
};

const ItemGist = ({ gists, onClickItem }: ItemGistProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      {gists.map((gist, index) => (
        <div key={gist.gistId}>
          {index === 0 ||
          gists[index - 1].uploadDate.split("T")[0] !==
            gists[index].uploadDate.split("T")[0] ? (
            <div
              className="choose-content-date"
              style={{ marginTop: index !== 0 ? "2rem" : "" }}
            >
              {gists[index].uploadDate.split("T")[0]}
            </div>
          ) : null}
          <div
            className="choose-content-wrapper"
            onClick={() => {
              onClickItem({ type: "gist", item: gist });
              setSelected(index);
            }}
            style={{
              backgroundColor: index === selected ? "#e9ecef" : "#ffffff",
            }}
          >
            <div className="choose-content">
              <div className="choose-content-text">
                <div>gist description: {gist.gistDescription}</div>
                <div>
                  <div>&nbsp;</div>
                  <div>gist filenames: </div>
                  {gist.gistFilenames.map((filename, index) => (
                    <div key={index}>
                      {index + 1}. {filename}
                    </div>
                  ))}
                </div>
              </div>
              <div className="choose-content-link-container">
                <a
                  className="text-link choose-content-link"
                  target="_blank"
                  rel="noreferrer"
                  href={"https://gist.github.com/" + gist.gistId}
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

export default ItemGist;

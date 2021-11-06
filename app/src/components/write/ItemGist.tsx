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
        <div
          className="choose-content-wrapper"
          key={gist.gistId}
          onClick={() => {
            onClickItem({ type: "gist", item: gist });
            setSelected(index);
          }}
          style={{
            backgroundColor: index === selected ? "#e9ecef" : "#ffffff",
          }}
        >
          <div className="choose-content">
            <div>gist description: {gist.gistDescription}</div>
            <div>
              <div>gist filenames: </div>
              {gist.gistFilenames.map((filename, index) => (
                <div key={index}>
                  {index}. {filename}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemGist;

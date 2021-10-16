import { GistState, SelectedItemState } from "../../modules/write";

type ItemGistProps = {
  gists: GistState[];
  onClickItem: (item: SelectedItemState) => void;
};

const ItemGist = ({ gists, onClickItem }: ItemGistProps) => {
  return (
    <>
      {gists.map((gist) => (
        <div
          className="choose-content"
          key={gist.gistId}
          onClick={() => onClickItem({ type: "gist", item: gist })}
        >
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
      ))}
    </>
  );
};

export default ItemGist;

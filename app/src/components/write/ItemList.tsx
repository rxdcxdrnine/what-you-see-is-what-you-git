import { GistState, PushState, SelectedItemState } from "../../modules/write";
import ItemGist from "./ItemGist";
import ItemImage from "./ItemImage";
import ItemPush from "./ItemPush";

type ItemListProps = {
  pushes: PushState[];
  gists: GistState[];
  selectedButton: "" | "push" | "gist" | "file";
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickItem: (item: SelectedItemState) => void;
};

const ItemList = ({
  pushes,
  gists,
  selectedButton,
  onClickItem,
  onClickButton,
}: ItemListProps) => {
  return (
    <div className="choose-container">
      <div className="choose-button-wrapper">
        <button
          className="choose-button"
          name="push"
          onClick={onClickButton}
          style={{
            backgroundColor: selectedButton === "push" ? "#e9ecef" : "#ffffff",
          }}
        >
          PUSHS
        </button>
        <button
          className="choose-button"
          name="gist"
          onClick={onClickButton}
          style={{
            backgroundColor: selectedButton === "gist" ? "#e9ecef" : "#ffffff",
          }}
        >
          GISTS
        </button>
        <button
          className="choose-button"
          name="file"
          onClick={onClickButton}
          style={{
            backgroundColor: selectedButton === "file" ? "#e9ecef" : "#ffffff",
          }}
        >
          IMAGES
        </button>
      </div>
      <div className="choose-content-container">
        {selectedButton === "push" ? (
          <div className="choose-content-container">
            <ItemPush pushes={pushes} onClickItem={onClickItem} />
          </div>
        ) : selectedButton === "gist" ? (
          <div className="choose-content-container">
            <ItemGist gists={gists} onClickItem={onClickItem} />
          </div>
        ) : selectedButton === "file" ? (
          <div className="choose-image-container">
            <ItemImage onClickItem={onClickItem} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemList;

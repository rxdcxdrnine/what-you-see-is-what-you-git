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
        <button className="choose-button" name="push" onClick={onClickButton}>
          PUSHS
        </button>
        <button className="choose-button" name="gist" onClick={onClickButton}>
          GISTS
        </button>
        <button className="choose-button" name="file" onClick={onClickButton}>
          IMAGES
        </button>
      </div>
      <div className="choose-content-container">
        {selectedButton === "push" ? (
          <ItemPush pushes={pushes} onClickItem={onClickItem} />
        ) : selectedButton === "gist" ? (
          <ItemGist gists={gists} onClickItem={onClickItem} />
        ) : selectedButton === "file" ? (
          <ItemImage onClickItem={onClickItem} />
        ) : null}
      </div>
    </div>
  );
};

export default ItemList;

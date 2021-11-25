import { WriteComponentState } from "../../containers/WriteContainer";
import { GistState, PushState, SelectedItemState } from "../../modules/write";
import ItemGist from "./ItemGist";
import ItemImage from "./ItemImage";
import ItemPush from "./ItemPush";

type ItemListProps = {
  pushes: PushState[];
  gists: GistState[];
  component: WriteComponentState;
  page: number;
  next: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickComponent: (component: WriteComponentState) => void;
  onClickItem: (item: SelectedItemState) => void;
  onClickMore: (page: number) => void;
};

const ItemList = ({
  pushes,
  gists,
  component,
  page,
  next,
  isOpen,
  setIsOpen,
  onClickItem,
  onClickMore,
  onClickComponent,
}: ItemListProps) => {
  return (
    <div
      className="choose-container"
      style={{ height: isOpen ? "90%" : "45%" }}
    >
      <div className="choose-button-wrapper">
        <button
          className="choose-button"
          onClick={() => onClickComponent("push")}
          style={{
            backgroundColor: component === "push" ? "#e9ecef" : "#ffffff",
          }}
        >
          PUSHS
        </button>
        <button
          className="choose-button"
          onClick={() => onClickComponent("gist")}
          style={{
            backgroundColor: component === "gist" ? "#e9ecef" : "#ffffff",
          }}
        >
          GISTS
        </button>
        <button
          className="choose-button"
          onClick={() => onClickComponent("file")}
          style={{
            backgroundColor: component === "file" ? "#e9ecef" : "#ffffff",
          }}
        >
          IMAGES
        </button>
      </div>
      <div
        className="choose-content-container"
        style={{ height: isOpen ? "100%" : "350px" }}
      >
        {component === "push" ? (
          <ItemPush
            pushes={pushes}
            page={page}
            next={next}
            onClickItem={onClickItem}
            onClickMore={onClickMore}
          />
        ) : component === "gist" ? (
          <ItemGist
            gists={gists}
            page={page}
            next={next}
            onClickItem={onClickItem}
            onClickMore={onClickMore}
          />
        ) : component === "file" ? (
          <div>
            <ItemImage onClickItem={onClickItem} />
          </div>
        ) : null}
      </div>
      {!isOpen ? (
        <div className="wide-narrow-button" onClick={() => setIsOpen(true)}>
          {"▼ WIDER"}
        </div>
      ) : (
        <div className="wide-narrow-button" onClick={() => setIsOpen(false)}>
          {"▲ NARROWER"}
        </div>
      )}
    </div>
  );
};

export default ItemList;

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
  onClickItem,
  onClickMore,
  onClickComponent,
}: ItemListProps) => {
  return (
    <div className="choose-container">
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
      <div className="choose-content-container">
        {component === "push" ? (
          <div className="choose-content-container">
            <ItemPush
              pushes={pushes}
              page={page}
              next={next}
              onClickItem={onClickItem}
              onClickMore={onClickMore}
            />
          </div>
        ) : component === "gist" ? (
          <div className="choose-content-container">
            <ItemGist
              gists={gists}
              page={page}
              next={next}
              onClickItem={onClickItem}
              onClickMore={onClickMore}
            />
          </div>
        ) : component === "file" ? (
          <div className="choose-image-container">
            <ItemImage onClickItem={onClickItem} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemList;

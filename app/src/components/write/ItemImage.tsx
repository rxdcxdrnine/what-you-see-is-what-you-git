import { ChangeEvent, useState } from "react";
import { SelectedItemState } from "../../modules/write";

type ItemImageProps = {
  onClickItem: (item: SelectedItemState) => void;
};

const ItemImage = ({ onClickItem }: ItemImageProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      onClickItem({ type: "file", item: e.target.files[0] });
    }
  };

  return (
    <div style={{ overflow: "hidden", textAlign: "center" }}>
      <label htmlFor="input-image">
        <img
          style={{
            objectFit: "contain",
            width: file ? "100%" : "auto",
            height: file ? "100%" : "auto",
          }}
          src={file ? URL.createObjectURL(file) : undefined}
          alt={file ? file.name : undefined}
        />
      </label>
      <input
        style={{ display: file ? "none" : "inline" }}
        id="input-image"
        type="file"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ItemImage;

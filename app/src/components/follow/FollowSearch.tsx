import "../../styles/follow.css";

type FollowSearchProps = {
  onClickSearch: (username: string) => void;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
};

const FollowSearch = ({
  onClickSearch,
  searchKey,
  setSearchKey,
}: FollowSearchProps) => {
  return (
    <div className="follow-search-container">
      <input
        className="follow-search"
        placeholder="Username"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button onClick={() => onClickSearch(searchKey)}>search</button>
    </div>
  );
};

export default FollowSearch;

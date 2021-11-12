type FollowSearchProps = {
  onClickSearch: (userName: string) => void;
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
      <button
        className="follow-search-button"
        onClick={() => onClickSearch(searchKey)}
      >
        search
      </button>
    </div>
  );
};

export default FollowSearch;

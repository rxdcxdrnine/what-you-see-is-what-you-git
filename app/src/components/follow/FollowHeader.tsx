type FollowHeaderProps = {
  selectedButton: "search" | "following" | "follower";
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const FollowHeader = ({ selectedButton, onClickButton }: FollowHeaderProps) => {
  return (
    <div className="follow-header-container">
      <button
        className="follow-header-button"
        name="search"
        onClick={onClickButton}
        style={{
          backgroundColor: selectedButton === "search" ? "#e9ecef" : "#ffffff",
        }}
      >
        search
      </button>
      <button
        className="follow-header-button"
        name="following"
        onClick={onClickButton}
        style={{
          backgroundColor:
            selectedButton === "following" ? "#e9ecef" : "#ffffff",
        }}
      >
        following
      </button>
      <button
        className="follow-header-button"
        name="follower"
        onClick={onClickButton}
        style={{
          backgroundColor:
            selectedButton === "follower" ? "#e9ecef" : "#ffffff",
        }}
      >
        follower
      </button>
    </div>
  );
};

export default FollowHeader;

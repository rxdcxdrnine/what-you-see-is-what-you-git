type FollowHeaderProps = {
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const FollowHeader = ({ onClickButton }: FollowHeaderProps) => {
  return (
    <div className="follow-header-container">
      <button
        className="follow-header-button"
        name="search"
        onClick={onClickButton}
      >
        search
      </button>
      <button
        className="follow-header-button"
        name="following"
        onClick={onClickButton}
      >
        following
      </button>
      <button
        className="follow-header-button"
        name="follower"
        onClick={onClickButton}
      >
        follower
      </button>
    </div>
  );
};

export default FollowHeader;

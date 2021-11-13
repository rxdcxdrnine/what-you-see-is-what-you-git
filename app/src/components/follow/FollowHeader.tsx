import { FollowComponentState } from "../../containers/FollowContainer";

type FollowHeaderProps = {
  selectedButton: FollowComponentState;
  onClickComponent: (component: FollowComponentState) => void;
  readOnly: boolean;
};

const FollowHeader = ({
  selectedButton,
  onClickComponent,
  readOnly,
}: FollowHeaderProps) => {
  return (
    <div className="follow-header-container">
      <button
        className="follow-header-button"
        name="search"
        onClick={() => onClickComponent("search")}
        style={{
          backgroundColor: selectedButton === "search" ? "#e9ecef" : "#ffffff",
        }}
        disabled={readOnly}
      >
        search
      </button>

      <button
        className="follow-header-button"
        name="following"
        onClick={() => onClickComponent("following")}
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
        onClick={() => onClickComponent("follower")}
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

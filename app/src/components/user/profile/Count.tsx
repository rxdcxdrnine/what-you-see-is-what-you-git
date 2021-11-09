type CountProps = {
  dayNum: number;
  followingNum: number;
  followerNum: number;
};

const Count = ({ dayNum, followingNum, followerNum }: CountProps) => {
  return (
    <div className="count-container">
      <div className="count-wrapper">
        <h3>DAYS</h3>
        <p>{dayNum}</p>
      </div>
      <div className="count-wrapper">
        <h3>FOLLOWINGS</h3>
        <p>{followingNum}</p>
      </div>
      <div className="count-wrapper">
        <h3>FOLLOWERS</h3>
        <p>{followerNum}</p>
      </div>
    </div>
  );
};

export default Count;

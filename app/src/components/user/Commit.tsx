import { useState } from "react";
import { commitFileState, commitState } from "../../modules/user";

import "../../styles/user.css";

type CommitProps = {
  commits: commitState[];
  onCloseModal: () => void;
};

const Commit = ({ commits, onCloseModal }: CommitProps) => {
  const [dropInd, setDropInd] = useState<number | null>(null);

  return (
    <>
      {commits.map((commit, index) => (
        <div key={commit.commitId}>
          <div
            className="post-wrapper"
            onClick={() => setDropInd(index !== dropInd ? index : null)}
          >
            <div>{commit.commitSha}</div>
            <div style={{ color: "red" }}>+{commit.additions}</div>
            <div style={{ color: "green" }}>-{commit.deletions}</div>
            <div>{commit.uploadDate}</div>
          </div>
          {index === dropInd && (
            <CommitFiles commitFiles={commit.commitFiles} />
          )}
        </div>
      ))}
    </>
  );
};

export default Commit;

type CommitFilesProps = {
  commitFiles: commitFileState[];
};

const CommitFiles = ({ commitFiles }: CommitFilesProps) => {
  return (
    <div>
      {commitFiles.map((commitFile) => (
        <div
          key={commitFile.commitFileId}
          className="post-wrapper"
          style={{ backgroundColor: "#dddddd" }}
        >
          <div>{commitFile.fileSha}</div>
          <div>{commitFile.fileName}</div>
          <div>{commitFile.fileStatus}</div>
          <div style={{ color: "red" }}>+{commitFile.additions}</div>
          <div style={{ color: "green" }}>-{commitFile.deletions}</div>
        </div>
      ))}
    </div>
  );
};

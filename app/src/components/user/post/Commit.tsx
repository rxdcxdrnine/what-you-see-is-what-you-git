import { useState } from "react";
import { CommitFileState, CommitState } from "../../../modules/user";

type CommitProps = {
  commits: CommitState[];
  onCloseModal: () => void;
};

const Commit = ({ commits, onCloseModal }: CommitProps) => {
  const [dropInd, setDropInd] = useState<number | null>(null);

  return (
    <>
      <h2 style={{ marginLeft: "0.5rem" }}>Commits</h2>
      {commits.map((commit, index) => (
        <div key={commit.commitId}>
          <div
            className="commit-wrapper"
            onClick={() => setDropInd(index !== dropInd ? index : null)}
            style={{ cursor: "pointer" }}
          >
            <div className="commit-text">
              <div>message: {commit.commitMessage}</div>
              <div>&nbsp;</div>
              <div>
                {"additions : "}
                <span style={{ color: "red" }}>+{commit.additions}</span>
              </div>
              <div>
                {"deletions : "}
                <span style={{ color: "green" }}>-{commit.deletions}</span>
              </div>
            </div>
            <div className="commit-link-container">
              <a
                className="text-link commit-link"
                target="_blank"
                rel="noreferrer"
                href={commit.commitUrl}
              >
                <button className="commit-button">LINK</button>
              </a>
            </div>
          </div>

          {index === dropInd && (
            <CommitFiles
              commitSha={commit.commitSha}
              commitFiles={commit.commitFiles}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Commit;

type CommitFilesProps = {
  commitSha: string;
  commitFiles: CommitFileState[];
};

const CommitFiles = ({ commitSha, commitFiles }: CommitFilesProps) => {
  return (
    <div>
      <h2 style={{ marginLeft: "0.5rem" }}>Files: Commit {commitSha}</h2>
      {commitFiles.map((commitFile) => (
        <a
          key={commitFile.commitFileId}
          className="text-link"
          target="_blank"
          rel="noreferrer"
          href={commitFile.commitFileUrl}
        >
          <div className="post-wrapper" style={{ backgroundColor: "#f0f0f0" }}>
            <div>file: {commitFile.fileName}</div>
            <br />
            <div>
              {"additions : "}
              <span style={{ color: "red" }}>+{commitFile.additions}</span>
            </div>
            <div>
              {"deletions : "}
              <span style={{ color: "green" }}>-{commitFile.deletions}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

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
            className="post-wrapper"
            onClick={() => setDropInd(index !== dropInd ? index : null)}
            style={{ cursor: "pointer" }}
          >
            <div>{commit.commitSha}</div>
            <div style={{ color: "red" }}>+{commit.additions}</div>
            <div style={{ color: "green" }}>-{commit.deletions}</div>
            <div>{commit.uploadDate}</div>
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
        <a className="text-link" href={commitFile.blobUrl}>
          <div
            key={commitFile.commitFileId}
            className="post-wrapper"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <div>{commitFile.fileSha}</div>
            <div>{commitFile.fileName}</div>
            <div>{commitFile.fileStatus}</div>
            <div style={{ color: "red" }}>+{commitFile.additions}</div>
            <div style={{ color: "green" }}>-{commitFile.deletions}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

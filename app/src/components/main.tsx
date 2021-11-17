import githubLogo from "../assets/images/GitHub_Logo_White.png";
import githubMark from "../assets/images/GitHub-Mark-Light-120px-plus.png";

const clientId: string = process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID as string;
const callbackUrl: string = process.env
  .REACT_APP_GITHUB_AUTH_CALLBACK_URL as string;

console.log(clientId);
console.log(callbackUrl);

const Main = () => {
  return (
    <>
      <div className="login-title">
        <div style={{ fontSize: "x-large" }}>WHAT-YOU-SEE-IS-WHAT-YOU-GIT</div>
        <div style={{ fontSize: "medium", marginTop: "1rem" }}>
          GET WHAT YOU GIT.
        </div>
      </div>
      <div className="login-container">
        <div>Login with Github</div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}`}
        >
          <button className="login-button">
            <div>
              <img className="github-mark" src={githubMark} alt="github mark" />
              <img className="github-logo" src={githubLogo} alt="github logo" />
            </div>
          </button>
        </a>
      </div>
    </>
  );
};

export default Main;

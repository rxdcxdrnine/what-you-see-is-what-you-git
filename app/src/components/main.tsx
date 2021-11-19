import githubLogo from "../assets/images/GitHub_Logo_White.png";
import githubMark from "../assets/images/GitHub-Mark-Light-120px-plus.png";

const serverUrl: string = process.env.REACT_APP_SERVER_URL as string;
const redirectUri: string = process.env.REACT_APP_REDIRECT_URI as string;

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
          href={`${serverUrl}/oauth2/authorize/github?redirect_uri=${redirectUri}`}
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

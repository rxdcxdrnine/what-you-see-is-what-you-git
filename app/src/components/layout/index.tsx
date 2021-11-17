import { Link } from "react-router-dom";
import "../../styles/layout.css";

type LayoutProps = {
  main?: boolean;
  onClickUser: () => void;
  onClickFollow: () => void;
  children: React.ReactNode;
};

const Layout = ({
  main = false,
  onClickUser,
  onClickFollow,
  children,
}: LayoutProps) => {
  return (
    <div className="main-page">
      <div className="main-container">
        <Header
          main={main}
          onClickUser={onClickUser}
          onClickFollow={onClickFollow}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

type HeaderProps = {
  main?: boolean;
  onClickUser: () => void;
  onClickFollow: () => void;
};

const Header = ({ main = false, onClickUser, onClickFollow }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          {main ? (
            <Link to="/" className="text-link">
              <div>WHAT-YOU-SEE-IS-WHAT-YOU-GIT</div>
            </Link>
          ) : (
            <Link
              to="/user"
              onClick={() => onClickUser()}
              className="text-link"
            >
              <div>WHAT-YOU-SEE-IS-WHAT-YOU-GIT</div>
            </Link>
          )}
        </div>
        {main ? null : (
          <div className="header-route">
            <Link
              to="/user"
              onClick={() => onClickUser()}
              className="text-link"
            >
              <div>MYPAGE &nbsp;</div>
            </Link>
            <Link to="/write" className="text-link">
              <div>WRITE &nbsp;</div>
            </Link>
            <Link
              to="/follow"
              onClick={() => onClickFollow()}
              className="text-link"
            >
              <div>FOLLOW</div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return <footer className="footer"></footer>;
};

export { Layout, Header, Footer };

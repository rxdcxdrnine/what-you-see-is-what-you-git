import { Link } from "react-router-dom";
import "../../styles/layout.css";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="main-page">
      <div className="main-container">
        <Header />
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <div>WHAT/YOU/SEE/IS/WHAT/YOU/GIT</div>
        </div>
        <div className="header-route">
          <Link to="/user" className="text-link">
            <div>USER &nbsp;/</div>
          </Link>
          <Link to="/write" className="text-link">
            <div>WRITE &nbsp;/</div>
          </Link>
          <Link to="/follow" className="text-link">
            <div>FOLLOW</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return <footer className="footer"></footer>;
};

export { Layout, Header, Footer };

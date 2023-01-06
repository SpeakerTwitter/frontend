import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header style={{ overflow: "hidden" }}>
      <nav className="nav">
        <img className="twitterBird"
          src="https://img.icons8.com/color/512/twitter--v1.png"
          alt="twitter bird"
        />
        <Link to="/">
          <h1 className="homeLink">Home</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

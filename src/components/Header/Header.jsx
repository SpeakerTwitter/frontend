import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header style={{ overflow: "hidden" }}>
      <div className="sidenav">
        <Link to="/">
          <img
            className="twitterBird"
            src="https://img.icons8.com/color/512/twitter--v1.png"
            alt="twitter bird"
          />
        </Link>

        <img
          className="twitterBird"
          src="https://img.icons8.com/fluency/512/stack-of-tweets.png"
          alt="create a tweet"
        />
      </div>
      <nav className="nav">
        <Link to="/">
          <h1 className="homeLink">Home</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

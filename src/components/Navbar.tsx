import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

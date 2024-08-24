import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.scss"; // Import SCSS for styling

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/meal-plan">Meal Plan</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;

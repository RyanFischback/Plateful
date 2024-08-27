import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    document.body.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

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
        <div
          className="theme-toggle"
          data-theme={darkMode ? "dark" : "light"}
          onClick={handleToggle}
        ></div>
      </header>
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

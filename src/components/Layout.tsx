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
              <Link to="/">Meal Plan</Link>
            </li>
          </ul>
        </nav>
        <div className="slider-container">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>
      </header>
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

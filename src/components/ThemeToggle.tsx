import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <input
        type="checkbox"
        className="theme-toggle-checkbox"
        id="theme-toggle"
        checked={theme === "dark"}
        readOnly
      />
      <label className="theme-toggle-label" htmlFor="theme-toggle">
        <span className="theme-toggle-slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;

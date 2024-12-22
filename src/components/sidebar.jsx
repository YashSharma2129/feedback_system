import React from "react";
import PropTypes from "prop-types";
import "../styles/Sidebar.css";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2 className={sidebarOpen ? "visible" : "hidden"}>
          KIET GROUP OF <br /> INSTITUTIONS
        </h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {sidebarOpen ? "Close" : "Open"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Feedback Form</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;

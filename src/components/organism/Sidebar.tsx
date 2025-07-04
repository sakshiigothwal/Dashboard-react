import React from "react";
import { NavLink,} from "react-router-dom";
import "../../styles/Sidebar.css";

const Sidebar = () => {

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Users", path: "/users" },
    // { label: "User Details", path: "/users/:id" },
    { label: "Blog List", path: "/blogs" },
    // { label: "Blog Details", path: "/blogs/:id" },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

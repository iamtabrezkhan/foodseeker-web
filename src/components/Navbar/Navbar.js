import React from "react";
import Classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={Classes.navbar}>
      <div className={Classes.logo}>FoodSeeker</div>
      <div className={Classes.menu}>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

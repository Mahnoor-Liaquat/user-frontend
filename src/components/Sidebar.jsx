import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/profile",
            name: "Your Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/courses",
            name: "Courses",
            icon: <FaCommentAlt />
        },
    ];

    return (
        <div className="container">
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="top_section">
                    <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>SMIT</h1>
                    <div className="bars" onClick={toggle}>
                        <FaBars />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) => isActive ? "link active" : "link"}
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main className="main">{children}</main>
        </div>
    );
};

export default Sidebar;

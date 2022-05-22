import React from 'react'
import {Link} from "react-router-dom";

function NavbarItem({name, href}) {
    return (
        <li className="nav-item active" key={name}>
            <Link className="nav-link" to={href}>{name}</Link>
        </li>
    )
}


export default function Header({navbarItems}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-opacity-25">
            <div className="text-center container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href} />)}
                    </ul>
                </div>
            </div>
        </nav>
        
    )
}
import React from 'react'

function NavbarItem({name, href}) {
    return (
        <li className="nav-item active">
          <a className="nav-link" to={href}>{name}</a>
        </li>
    )
}


export default function Header({navbarItems}) {
    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-dark bg-opacity-25">
            <div class="text-center container-fluid">
         
                <div class="collapse navbar-collapse" id="navbarExample01">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href} />)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
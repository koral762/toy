import React from 'react'
import { NavLink } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="main-footer mt-2">
            <div className="container flex space-btw">

                <h1>&copy; misterToy inc.</h1>
                <nav>
                    <ul className="clean-list flex">
                        <li><NavLink exact to="/" >Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink> </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

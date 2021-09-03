import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export class Header extends Component {
    render() {
        return (
            <header className="main-header">
                <div className="container flex space-btw align-c">
                    <h1>misterToy</h1>
                    <nav>
                        <ul className="clean-list flex">
                            <li><NavLink exact to="/" >Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink> </li>
                            <li><NavLink to="/toys">Our Toys</NavLink> </li>
                            <li><NavLink to="/chart">Dashboard</NavLink> </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

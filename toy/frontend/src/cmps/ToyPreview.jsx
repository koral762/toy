import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export class ToyPreview extends Component {
    state = {
        isHover: false
    }
    getTime(timestamp) {
        const date = new Date(timestamp).toLocaleDateString("en-UK")
        let time = new Date(timestamp).toLocaleTimeString("en-UK")
        time = time.slice(0, 5)
        return date
    }
    toggleHover = () => {
        // const { isHover } = this.state
        this.setState({ isHover: true })
    }
    mouseOut = () => {
        this.setState({ isHover: false })
    }
    render() {
        const { isHover } = this.state
        const { toy, removeToy, toggleFavourite } = this.props
        return (
            <div onMouseEnter={this.toggleHover} onMouseLeave={this.mouseOut} 
            className={toy.isFavourite ? "toy-preview favourite flex flex-column align-c" : "toy-preview flex flex-column align-c"} >
                <img src={`https://robohash.org/${toy.name}`} alt="" />
                <h1>{toy.name}</h1>
                <p>&euro;{toy.price}</p>
                <p className="ctg">Category: {toy.type}</p>
                <p className="toy-created">Added on: {this.getTime(toy.createdAt)}</p>
                {toy.inStock &&
                    <h2 className="in-stock">In stock!</h2>}
                {isHover &&
                    <div className="toy-actions mt-2 flex space-btw">
                        <i className="far fa-star" onClick={() => { toggleFavourite(toy._id) }} 
                        title="Favourite"></i>

                        <Link to={`/toys/${toy._id}/details`} ><i className="far fa-question-circle" 
                        title="Read more"></i></Link>

                        <i className="far fa-trash-alt" onClick={() => { removeToy(toy._id) }} 
                        title="Delete"></i>
                    </div>
                }
            </div>
        )
    }
}

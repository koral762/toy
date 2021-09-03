// import React from 'react'
import React, { Component } from 'react'
import { toyService } from '../services/toy-service'
import { Link } from 'react-router-dom'

export class ToyDetails extends Component {
    state = {
        toy: ''
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => this.setState({ toy }))
    }

    render() {
        const { toy } = this.state
        return (
            <div>
                <Link to={`/toys/${toy._id}/edit`} ><i className="far fa-edit"></i></Link>
                {/* <i className="far fa-star" onClick={() => { toggleFavourite(toy._id) }}></i> */}
            </div>
        )
    }
}

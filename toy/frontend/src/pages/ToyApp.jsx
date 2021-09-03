import { Component } from 'react'
import { connect } from 'react-redux'

import { loadToys, addToy, removeToy, toggleFavourite } from '../store/actions/toy.actions'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyAdd } from '../cmps/ToyAdd.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort'

class _ToyApp extends Component {
    componentDidMount() {
        this.props.loadToys()
    }

    onSetFilter = (filterBy) => {
        this.props.loadToys(filterBy)
    }
    onSort = (sortBy) => {
        console.log ('sortBy =',sortBy)
        // this.props.loadToys(sortBy)
    }

    render() {
        const { toys } = this.props
        if (!toys || !toys.length) return <div>Loading</div>
        return (
            <div className="container mt-2">
                <div className="flex space-btw">
                    <ToyAdd addToy={this.props.addToy} />

                    <div className="flex">
                        <ToySort onSort={this.onSort}/>
                        <ToyFilter onSetFilter={this.onSetFilter} />
                    </div>
                </div>
                <ToyList toys={toys} removeToy={this.props.removeToy}
                    toggleFavourite={this.props.toggleFavourite} />


            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('state.toyModule =', state.toyModule)
    return {
        toys: state.toyModule.toys
    }
}
const mapDispatchToProps = {
    loadToys,
    addToy,
    removeToy,
    toggleFavourite,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
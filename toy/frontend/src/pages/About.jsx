import { Component } from 'react'
import { connect } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'

class _About extends Component {

    componentDidMount() {
        // if  no toys load toys 
        const { toys } = this.props
        if (!toys || !toys.length) {
            this.props.loadToys()
        }
    }
    getTotalToys() {
        const { toys } = this.props
        return toys.length
    }
    getBiggestCtg() {
        const { toys } = this.props
        const toysMap = toys.reduce((objMap, toy) => {
            const type = toy.type.toLowerCase()
            objMap[type] ? objMap[type]++ : objMap[type] = 1
            return objMap
        }, {})
        console.log('toysMap =', toysMap)
        const keys = Object.values(toysMap);
        console.log('keys =', keys)
    }
    render() {
        const { toys } = this.props
        if (!toys) return <div>Loading...</div>
        return (
            <section className="about-us">
                <div className="container">
                    <h1>Our mister Toy</h1>
                    <p>We currently have {this.getTotalToys()} different toys in stock!</p>
                    <p>The largest category is {this.getBiggestCtg()}.</p>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}
const mapDispatchToProps = {
    loadToys,

}

export const About = connect(mapStateToProps, mapDispatchToProps)(_About)
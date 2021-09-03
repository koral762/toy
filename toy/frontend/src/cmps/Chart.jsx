import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'

class _Chart extends Component {
    // load toys on cdm? or just send data from service? 

    state = {
        map: ''
    }
    componentDidMount() {
        // if  no toys load toys 
        const { toys } = this.props
        if (!toys || !toys.length) {
            console.log('chart loading toys')
            this.props.loadToys()
                .then(() => {
                    const map = this.sumPricePerType()
                    this.setState({ map })
                })
        }
        const map = this.sumPricePerType()
        this.setState({ map })
    }

    sumPricePerType = () => {
        const { toys } = this.props
        if (!toys) return
        const map = toys.reduce((acc, toy) => {
            const type = toy.type.toLowerCase()
            if (acc[type]) acc[type] += toy.price
            else acc[type] = toy.price
            return acc
        }, {});
        return map
    }

    makeChartData = () => {
        if (!this.state.map) return
        const data = {
            labels: Object.keys(this.state.map),
            datasets: [
                {
                    label: 'Total price per category',
                    data: Object.values(this.state.map),
                    backgroundColor: [
                        '#b3e6c0',
                        '#bdbce8',
                        '#dbcbb6',
                    ],
                    borderColor: [
                        '#77a683',
                        '#7a79c9',
                        '#b39166',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return data
    }

    render() {
        // if (!this.props.toys) return <div>Loading</div>
        const data = this.makeChartData()
        return (
            <section className="chart container">
                <div className="flex flex-column align-c">


                    <h1>Total price per category</h1>
                    <div className="container">

                        {/* <Bar data={data} /> */}
                        <Pie height="500" width="500" data={data} options={{ maintainAspectRatio: false }}
                        />
                    </div>
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

export const Chart = connect(mapStateToProps, mapDispatchToProps)(_Chart)

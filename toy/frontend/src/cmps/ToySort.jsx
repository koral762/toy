import Button from '@material-ui/core/Button';
import { Component } from 'react'

export class ToySort extends Component {
    state = {
        sortBy: '',
        alphaIsDec: false,
        numericIsDec: false
    }
    onSort = (ev) => {
        let field = ''
        let sortBy
        if (ev.target.name === 'name' || ev.target.dataset.name == 'name') {
            field = 'alphaIsDec'
            sortBy = 'name'
        }
        if (ev.target.name === 'price' || ev.target.dataset.name == 'price') {
            field = 'numericIsDec'
            sortBy= 'price'
        }
        const currVal =this.state[field]
        this.setState({...this.state, [field]: !currVal}, this.props.onSort(sortBy))
    }
    getAlphaClass = () => {
        if (!this.state.alphaIsDec) return 'down'
        return 'up'
    }
    getNumericClass = () => {
        if (!this.state.numericIsDec) return 'down'
        return 'up'
    }
    render() {
        const classAlpha = this.getAlphaClass()
        const classNumeric = this.getNumericClass()
        console.log('classAlpha =', classAlpha)
        return (
            <div className="toy-sort">
                <Button  onClick={(ev) => this.onSort(ev)} variant="outlined" name="name">
                    <i className={`fas fa-sort-alpha-${classAlpha}`} data-name="name" ></i>
                </Button>

                <Button onClick={(ev) => this.onSort(ev)} variant="outlined" name="price">
                    <i  className={`fas fa-sort-numeric-${classNumeric}`} data-name="price" ></i>
                </Button>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { toyService } from '../services/toy-service'
import { withRouter } from 'react-router-dom';
// import ContentEditable from 'react-contenteditable'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import { updateToy } from '../store/actions/toy.actions'


class _ToyEdit extends Component {

    state = {
        toy: null,
        edits: {
            name: '',
            price: 0,
            type: '',
            inStock: true,
            isFavourite: true,
        }
    }
    // contentEditable = React.createRef();

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => {
                const { name, price, type, inStock, isFavourite } = toy
                this.setState({ toy, edits: { name, price, type, inStock, isFavourite } })
            })
    }
    handleChange = (ev) => {
        console.log('ev =', ev)
        const field = ev.target.name
        let value = ev.target.value
        if (ev.target.type === 'checkbox') value = ev.target.checked
        this.setState({ ...this.state, edits: { ...this.state.edits, [field]: value } });
    };
    onUpdateToy = () => {
        const { name, price, type, inStock, isFavourite } = this.state.edits
        const { toy } = this.state
        toy.name = name
        toy.price = price
        toy.type = type
        toy.type = type
        toy.isFavourite = isFavourite
        // const updatedToy = { name, price, type }
        this.props.updateToy(toy)
            .then(() => this.goToList())

    }
    goBack = () => {
        this.props.history.goBack()
    }
    goToList = () => {
        this.props.history.push('/toys')
    }
    render() {
        const { toy } = this.state
        const { name, price, type, inStock, isFavourite } = this.state.edits
        if (!toy) return <div>Loading</div>
        return (
            <section className="toy-details mt-2 flex flex-column align-c">

                {/* <ContentEditable
                    // innerRef={this.contentEditable}
                    html={name} // innerHTML of the editable div
                    // disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                // tagName='article' // Use a custom HTML tag (uses a div by default)
                /> */}

                <img src="https://robohash.org/set=set3" alt="" />

                <label htmlFor="name">Change title:</label>
                <Input type="text" name="name" id="name" value={name} onChange={this.handleChange}></Input>

                <label htmlFor="price">Change price:</label>
                <Input type="number" name="price" id="price" value={price} onChange={this.handleChange}></Input>


                <label htmlFor="type">Change category:</label>
                <Select name="type" id="type" value={type} onChange={this.handleChange}>
                    <MenuItem value="adult">Adults</MenuItem>
                    <MenuItem value="educational">Educational</MenuItem>
                    <MenuItem value="funny">Funny</MenuItem>
                </Select>

                <Checkbox type="checkbox" name="inStock" id="inStock" checked={inStock}
                    onChange={this.handleChange}></Checkbox>
                <label htmlFor="inStock">
                    <FormHelperText>In stock</FormHelperText>
                </label>

                <Checkbox type="checkbox" name="isFavourite" id="isFavourite" checked={isFavourite}
                    onChange={this.handleChange}></Checkbox>
                <label htmlFor="isFavourite">
                    <FormHelperText>Is Favourite</FormHelperText>
                </label>


                {/* {inStock &&
                    <h2>In stock!</h2>}
                {isFavourite &&
                    <h2>This is one of your favourites!</h2>} */}

                <Button variant="outlined" onClick={this.onUpdateToy}>Save changes</Button>

                <Button onClick={this.goBack}>Go Back</Button>
                <Button onClick={this.goToList}>Back to list</Button>

            </section>
        )
    }
}

const mapDispatchToProps = {
    updateToy
}

// dispatch the function from the store -> onUpdateToy

_ToyEdit = connect(null, mapDispatchToProps)(_ToyEdit)
export const ToyEdit = withRouter(_ToyEdit);

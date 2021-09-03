import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

export class ToyAdd extends Component {
    state = {
        isAdding: false,
        toy: {
            name: '',
            price: '',
            type: 'educational',
            inStock: true
        }
    }
    onOpenAddModal = () => {
        const { isAdding } = this.state
        this.setState({ ...this.state, isAdding: !isAdding })
    }
    handleChange = (ev) => {
        const field = ev.target.name
        let value = ev.target.value
        this.setState({ ...this.state, toy: { ...this.state.toy, [field]: value } })
    }
    onAdd = () => {
        let { name, price, type, inStock } = this.state.toy
        price = +price
        const toy = { name, price, type, inStock }
        console.log('todo =', toy)
        this.onOpenAddModal()
        this.props.addToy(toy)
    }
    anchor = React.createRef();
    render() {
        const { isAdding } = this.state
        const { name, price, type, inStock } = this.state.toy

        return (
            <div>
                <div className="mt-1">
                    <div className="">

                        {!isAdding &&
                            // <button onClick={this.onOpenAddModal}>Add your toy</button>
                            <Button variant="outlined" onClick={this.onOpenAddModal}>Add your toy</Button>
                        }

                        {isAdding &&
                            <Popover
                                open={this.state.isAdding}
                                onClose={this.onOpenAddModal}
                                // anchorOrigin={{
                                //     vertical: 'bottom',
                                //     horizontal: 'center',
                                // }}
                                // transformOrigin={{
                                //     vertical: 'top',
                                //     horizontal: 'left',
                                // }}
                                className="add-toy-form flex">
                                <form onSubmit={(ev) => this.onAdd(ev.preventDefault())}>
                                    <div>
                                        <label htmlFor="name">Title:</label>
                                        <Input autoComplete="off" type="text" name="name" id="name" value={name}
                                            onChange={this.handleChange} placeholder="Enter new title" />
                                    </div>
                                    <div>
                                        <label htmlFor="price">Price:</label>
                                        <Input type="number" name="price" id="price" value={price}
                                            onChange={this.handleChange} placeholder="Enter new price" />
                                    </div>
                                    <div>
                                        <label htmlFor="type">Category:</label>
                                        <Select name="type" id="type" value={type} onChange={this.handleChange}>
                                            <MenuItem value="adult">Adult</MenuItem>
                                            <MenuItem value="educational">Educational</MenuItem>
                                            <MenuItem value="funny">Funny</MenuItem>
                                        </Select>
                                    </div>

                                    <div>
                                        <Checkbox type="checkbox" name="inStock" id="inStock" value={inStock}
                                            onChange={this.handleChange}></Checkbox>
                                        <label htmlFor="inStock">
                                            <FormHelperText>In stock</FormHelperText>
                                        </label>
                                    </div>
                                    <div className="add-btns flex align-c space-ard">
                                        <Button type="submit" variant="outlined">Add</Button>
                                        <Button type="button" onClick={this.onOpenAddModal}>Cancel</Button>
                                    </div>
                                </form>
                            </Popover>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

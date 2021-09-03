import React, { Component } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/core/styles';

export class ToyFilter extends Component {
    state = {
        filterBy: {
            isOpen: false,
            name: '',
            inStock: '',
            type: 'All'
        }
    }
    // useStyles = makeStyles({
    //     drawer: {
    //         width: 250,
    //     },
    // })

    handleChange = (ev) => {

        const field = ev.target.name
        let value = ev.target.value
        if (value === 'all') value = ''
        if (ev.target.type === 'checkbox') value = ev.target.checked
        const filterBy = { [field]:field, value:value }
        console.log ('filterBy =',filterBy)
        this.setState({ ...this.state, filterBy: { ...this.state.filterBy, [field]: value } },
            this.props.onSetFilter(filterBy)
        )
    }
    toggleFilter = () => {
        const { isOpen } = this.state.filterBy
        this.setState({ ...this.state, filterBy: { ...this.state.filterBy, isOpen: !isOpen } })
    }

    // StyledButton = withStyles({
    //     root: {
    //         padding: '20px',
    //     },
       
    // })(Drawer);
    render() {
        const { name, inStock, type, isOpen } = this.state.filterBy
        return (
            <React.Fragment key="right">
                <Button variant="outlined" onClick={this.toggleFilter}>Filter</Button>

                {isOpen &&
                    <Drawer classes={{ label: 'my-class-name' }} anchor="right" open={true} onClose={this.toggleFilter}>

                        <FormGroup className="flex align-c">
                            <label htmlFor="name"></label>
                            <Input autoComplete="off" type="text" name="name" id="name" value={name}
                                placeholder="Search by name"
                                onChange={this.handleChange}></Input>

                            <label htmlFor="type"></label>
                            <Select name="type" id="type" value={type} onChange={this.handleChange}>
                                <MenuItem value="">All</MenuItem>
                                {/* map toy.type */}
                                <MenuItem value="adult">Adults</MenuItem>
                                <MenuItem value="educational">Educational</MenuItem>
                                <MenuItem value="funny">Funny</MenuItem>
                            </Select>

                            <Checkbox style={{ width: '25%' }} type="checkbox" name="inStock" id="inStock" value={inStock}
                                onChange={this.handleChange}></Checkbox>
                            <label htmlFor="inStock">
                                <FormHelperText>In stock</FormHelperText>
                            </label>


                        </FormGroup>
                    </Drawer>
                }
            </React.Fragment >

        )
    }
}

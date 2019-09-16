import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class AddMovie extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            description: '',
            year: '',
            director: '',
            image: ''
        }
    }
    handleSave = () => {
        fetch('http://localhost:8080/add-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                year: this.state.year,
                director: this.state.director,
                image: this.state.image
            })
        }).then(response => {
            this.setState({
                name: '',
                description: '',
                year: '',
                director: '',
                image: ''
            })
        })
        .then(response => {
            this.props.history.push("/movies")
        })
    }
    handleTextBoxChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type='text' name='name' placeholder="movie Title" value={this.state.name} onChange={this.handleTextBoxChange} />

                <input type='text' name='description' placeholder="movie plot" value={this.state.description} onChange={this.handleTextBoxChange} />
                <input type='number' name='year' placeholder="movie Yerar" value={this.state.year} onChange={this.handleTextBoxChange} />
                <input type='text' name='director' placeholder="movie director" value={this.state.director} onChange={this.handleTextBoxChange} />
                <input type='text' name='image' placeholder="movie poster url" value={this.state.image} onChange={this.handleTextBoxChange} />
                <button onClick={this.handleSave}>Add Movie</button>


            </div>
        )
    }

}

export default withRouter(AddMovie)
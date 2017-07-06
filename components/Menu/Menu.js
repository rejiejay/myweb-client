import React, { Component } from 'react'



class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = { 
		userInput: ''
    }
    this.handleChange = this.handleChange.bind(this),
    this.clearAndFocusInput = this.clearAndFocusInput.bind(this)
  }
    handleChange(e) {
        this.setState({userInput: e.target.value});
    }
    clearAndFocusInput() {
        this.setState({userInput: ''}, function() {
            // This code executes after the component is re-rendered
            this.refs.theInput.getDOMNode().focus();
        });
    }
    render() {
        return (
          <div className="reconstruction" >
            <img src="image/reconstruction.jpg" />
          </div>
        )
    }
}


export default Menu
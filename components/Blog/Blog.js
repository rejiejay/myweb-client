import React, { Component } from 'react'



class Blog extends Component {
  constructor(props,context) {
    super(props,context)
    this.state = { 
    	userInput: ''
    }
    this.handleChange = this.handleChange.bind(this),
    this.clearAndFocusInput = this.clearAndFocusInput.bind(this)
    

  }
    handleChange(e) {
      this.setState({userInput: e.target.value});
      console.log(e.target.value)
    }
    clearAndFocusInput() {
      this.setState({userInput: ''}); // Clear the input
      // We wish to focus the <input /> now!
      console.log(this.refs.theInput)
    }
    render() {
      return (
        <div className="reconstruction" >
          <img src="image/reconstruction.jpg" />
        </div>
      )
    }

}


export default Blog
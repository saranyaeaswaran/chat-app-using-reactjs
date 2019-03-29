import React from "react"

class SendMessageForm extends React.Component {

  constructor(){
    super()
    this.state = {
      value : ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      value : event.target.value
    })

  }

  handleSubmit(event){
    event.preventDefault()
    this.props.sendMessage(this.state.value)
    this.setState({
      value:""
    })

  }

  render(){ 
    return (
      <form className="send-message-form" onSubmit = {this.handleSubmit}>
        <input
          disabled={this.props.inputDisableValue}
          type="text"
          placeholder="Type your message here..."
          onChange = {this.handleChange}
          value = {this.state.value}
         />
      </form>


    )

  }
}

export default SendMessageForm
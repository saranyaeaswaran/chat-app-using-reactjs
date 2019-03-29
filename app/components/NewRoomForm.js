import React from "react"

class NewRoomForm extends React.Component {

  constructor(){
    super()
    this.state = {
      roomName : ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event){
    this.setState({
      roomName : event.target.value
    })

  }

  handleClick(event){
    console.log("room name from state is : "+this.state.roomName)
    this.props.newRoom(this.state.roomName)
    this.setState({
      roomName:""
    })

  }

  render(){ 

    return (
      <div className="new-room-form">
        <form>
          <input 
            type="text"
            placeholder="New Room is..."
            onChange = {this.handleChange}
            value = {this.state.value}
          />
          <button onClick = {this.handleClick}>+</button>
        </form>
      </div>


    )

  }
}

export default NewRoomForm
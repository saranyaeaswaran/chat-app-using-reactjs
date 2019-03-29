import React from "react"

class RoomList extends React.Component {

  render(){ 
    const orderedRooms = [...this.props.allRooms].sort(function(a,b){
      return(a.roomId-b.roomId)
    })
    return (
      <div className="rooms-list">
        <ul>
        <h3>Your rooms: </h3>         {
            orderedRooms.map((room)=> {
            const active = (room.id===this.props.currentRoomId) ? "active" : ""
            return (
               <li key={room.id} className={"room"+active} >
               <a 
                href='#' 
                onClick={()=>this.props.subscribeToRoom(room.id)}
               >  #{room.name}  </a>
               </li>
            )
          })
          }
          </ul>
          
        </div>
      
    )
 }
}

export default RoomList
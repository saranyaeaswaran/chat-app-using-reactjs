import React from "react"
import Message from './Message'
import ReactDOM from 'react-dom'

class MessageList extends React.Component {

  componentWillMount(){
    
  }
  
  componentDidUpdate(){
    const messageListNode = ReactDOM.findDOMNode(this)
    messageListNode.scrollTop = messageListNode.scrollHeight
  }

  render(){
      if(!this.props.currentRoomId){
        return (
          <div className="message-list">
            <div className="join-room">
                &larr; Join a room!
            </div>
          </div>
        )
      }
      
      if(this.props.messageList.length==0){
        
        return(
          <div className="message-list">
          <div className="join-room">
              &larr; No chats yet...
          </div>
        </div>
        )
      }
      const mod_chatItem=this.props.messageList.map((chatItem,index)=>
              <Message key={index} 
                username= {chatItem.senderId}
                text={chatItem.text}
                            
              />           
      ) 

    return (
      <div className="message-list">
        {mod_chatItem}
        
      </div>
    )

  }

}

export default MessageList
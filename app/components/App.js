import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
// import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'
import NewRoomForm from './NewRoomForm';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messageList: [],
            joinableRooms: [],
            joinedRooms: [],
            currentRoomId: '',
            inputDisableValue: true

        }

        this.sendMessageFromUser = this.sendMessageFromUser.bind(this)
        this.getRoomList = this.getRoomList.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.newRoomFromUser = this.newRoomFromUser.bind(this)

    }

    componentDidMount() {

        const userId1 = prompt(("Please enter your name", "e.g. anyone"))
        console.log(userId1)

        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            // userId: 'saranya',
            userId: userId1,
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })

        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser

                //To get the room list
                this.getRoomList()
                    //To get the chat message in a specific room
                    // this.subscribeToRoom()
            })

    }

    getRoomList() {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms: joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
    }

    subscribeToRoom(roomId) {
        const localMessageData = []
        this.state.messageList = []
        this.currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onMessage: message => {
                        localMessageData.push({
                            "senderId": message.senderId,
                            "text": message.text
                        })

                        this.setState({
                            messageList: localMessageData
                        })

                    }
                }

            })
            //To set the current room id irrespective of the room has messages or not, and to set the chat input text field disable value. input field wil be enabled only if the user has joined a room
            .then(this.setState({
                currentRoomId: roomId,
                inputDisableValue: false
            }))
            .then(room => this.getRoomList())
    }

    sendMessageFromUser(message) {

        this.currentUser.sendMessage({
            text: message,
            roomId: this.state.currentRoomId
        })

    }

    newRoomFromUser(roomName) {
        this.currentUser.createRoom({
                name: roomName
            })
            .then(room => this.subscribeToRoom(room.id))
    }

    render() {
        return ( <
            div className = "app" >
            <
            RoomList allRooms = {
                [...this.state.joinableRooms, ...this.state.joinedRooms] }
            subscribeToRoom = { this.subscribeToRoom }
            currentRoomId = { this.state.currentRoomId }
            />  <
            MessageList messageList = { this.state.messageList }
            currentRoomId = { this.state.currentRoomId }
            /> { /* <NewRoomForm /> */ } <
            NewRoomForm newRoom = { this.newRoomFromUser }
            /> <
            SendMessageForm sendMessage = { this.sendMessageFromUser }
            inputDisableValue = { this.state.inputDisableValue }
            /> <
            /div>


        )
    }
}

export default App
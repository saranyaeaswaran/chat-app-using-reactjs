# React_Chat_App
A chat app created using React JS and Pusher Chatkit API
This project is using https://scrimba.com/playlist/pbNpTv as guidance
This chatapp is live on https://saranya-react-chatapp.herokuapp.com. Please login as 'anyone' in the prompt and join a room to start chatting.

# Few notes on creating this App:

	• Create a dummy messgalist.js for test purpose
	• Signup and login to Create a Chatkit instance and provide them in the config.js and import them to App.js
	• Create a ChatKit Manager instance with the below code in 'ComponentDidMount' function
		const chatManager = new Chatkit.chatManager({
			instanceLocator:instanceLocator,
			userId : "Saranya",
			tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
		})
		
	• Create a test user and test room in chatkit instance and programatically connect using the below code,
	        chatManager.connect()
	        .then(currentUser => {
	            currentUser.subscribeToRoom({
	                roomId: '19544441',
	                hooks: {
	                    onMessage: message => {
	                        console.log('message.text: ', message.text);
	                    }
	                }
	            })
	        })
	• Now setState for the new messages being logged and pass this to the main App.js as message list
	• Convert the messages in the chatroom into a messagelist using setState
	                        localMessageData.push(
	                            {"senderId" : message.senderId,
	                            "text" : message.text
	                            }   
	                        )
	                        this.setState({
	                           messageList : localMessageData
	                       })
	
	
	• Send this messaglist to Messagelist.js to render in UI
	• Separate the messages into Message.js component and call it from MessageList.js file
	• Add a SendMessageForm component with a simple form element with input text box and add this to App.js. OnChange the value of this controlled component setState will set the value typed in the input box and and OnSubmit this value will be sent to ChatKit server
	• Make the currentUser in the chatKit connect function a global one by assigning it to this.currentUser
	• Add below function to a another method in App.JS and pass this method as props to SendUserForm to get the value from submiting the form
	        this.currentUser.sendMessage(
	            {
	                text:message,
	                roomId : '19544441'
	            }
	        )
	• Create RoomList.js which ll accept rooms (joinable rooms and already joined rooms) as array from App.js and use map method to display each room to the RoomList panel
	• From App.js get the rooms of the current chat instance by below code,
	            this.currentUser.getJoinableRooms()
	            .then(joinableRooms=>{
	                this.setState({
	                    joinableRooms : joinableRooms,
	                    joinedRooms : this.currentUser.rooms
	                })
	            })
	
	• Now separate the subscribe to room list and pass this to RoomList.js as props to get the room id while clicking on a particular room
	• Since joinable rooms and joined rooms keep getting shuffled as the user clicks the room, to order the rooms list, use a sort function in RoomsList.js to order the rooms based on the room id
	• To highlight the clicked room, get the active room id and compare it with the currently clicked room Id and assign a difference class name with specific css style associated
	• To scroll down the messages - in MessageLost.js
		  componentDidUpdate(){
		    const messageListNode = ReactDOM.findDOMNode(this)
		    messageListNode.scrollTop = messageListNode.scrollHeight
		  }
		
		○ The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.
		○ The Element.scrollHeight read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow.
	• To create a room use the below function similar to SendMessageForm,
	
		    newRoomFromUser(roomName){
		        console.log("New room is "+roomName)
		        this.currentUser.createRoom({
		            name:roomName
		        })
		        .then(room=>this.subscribeToRoom(room.id))
		    }



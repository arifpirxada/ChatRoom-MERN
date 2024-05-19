import { useEffect, useRef, useState } from "react";
import { socket } from "../socket"
import moment from "moment"

function ChatRoom({ userName, getOnlineUsers }) {
  const [messageList, setMessageList] = useState([])

  const chatBox = useRef(null)
  const scrollToBottom = () => {
    if (chatBox.current) {
      setTimeout(() => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight
      }, 10);
    }
  }

  const loadPreviousMessages = async () => {
    try {
      const res = await fetch("/api/read-messages")
      const data = await res.json()
      console.log(data)
      if (!data.message) {
        setMessageList(data)
      }
    } catch (error) {
      console.log(error)
      alert("could not load messages")
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((previousMessages) => [...previousMessages, { sender: data.name, message: data.message, date: moment().format("DD MMM, YYYY h:mm A") }]);
    };

    const handleUserConnected = (name) => {
      alert(`${name} joined the room`);
      getOnlineUsers()
    };

    const handleUserDisconnected = (name) => {
      alert(`${name} left the room`);
      getOnlineUsers()
    };

    const handleMakeUserOnline = () => {
      getOnlineUsers()
    }

    socket.on('receive message', handleReceiveMessage);
    socket.on('userConnected', handleUserConnected);
    socket.on('userDisconnected', handleUserDisconnected);
    socket.on("makeUserOnline", handleMakeUserOnline)

    return () => {
      socket.off('receive message', handleReceiveMessage);
      socket.off('userConnected', handleUserConnected);
      socket.off('userDisconnected', handleUserDisconnected);
      socket.off("makeUserOnline", handleMakeUserOnline)
    };
  }, []);

  const [message, setMessage] = useState("")

  const sendMessage = (e) => {
    e.preventDefault()

    if (message.length < 1 || message.length > 1000) {
      alert("Message must be between 1 and 1000 characters.");
      return;
    }

    socket.emit("send message", { message: message, name: userName })
    setMessageList((previousMessages) => [...previousMessages, { sender: userName, message: message, date: moment().format("DD MMM, YYYY h:mm A") }])
    e.target.firstChild.value = ""
  }

  return (
    <>
      <div className="bg-[#323643] pt-20 p-2 min-h-screen">
        <div className="flex justify-center">
          <button onClick={ loadPreviousMessages } type="button" className="rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-600 active:bg-neutral-900">
            Load previous messages
          </button>
        </div>
        {/* Messages */ }
        <div ref={ chatBox } id="chat-box" className="text-white pb-12 flex flex-col pl-8 pr-8">
          { messageList.map((item, key) => (
            <div key={ key } className={ `${item.sender == userName ? "self-end" : ""} transition-all bg-[#606470] w-fit p-3 rounded-lg m-4` }>
              <p className="mb-1 font-mono text-green-400">{item.date}</p>
              <p className="text-green-400 font-mono">{ item.sender }</p><hr className="mb-2 mt-1  border-green-400 border-[1px] rounded-3xl" />
              <p>{ item.message }</p>
            </div>
          )) }
        </div>

        <form onSubmit={ sendMessage } className="fixed bottom-8 flex justify-center w-screen">
          <input required onChange={ (e) => { setMessage(e.target.value) } } type="text" placeholder="Message" className="outline-none drop-shadow p-3 rounded w-[70vw] sm:w-[40vw] h-8 border-slate-600" />
          <button className="ml-4 text-white bg-green-600 pl-2 drop-shadow hover:bg-green-800 focus:bg-green-400  pr-2 rounded">Send</button>
        </form>

      </div>
    </>
  )
}

export default ChatRoom
import { useEffect, useState } from 'react'
import './App.css'
import ChatRoom from './components/Chatroom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { socket } from "./socket"

function App() {

  const [userName, setUserName] = useState("")
  const [loginStatus, setLoginStatus] = useState(false)

  const authorize = async () => {
    try {
      const response = await fetch("/api/authorize")
      const data = await response.json()
      if (data.message == "authorized") {
        setLoginStatus(true)
        setUserName(data.name)
      }
    } catch (error) {
      console.log("An error occured while authorizing: ", error)
    }
  }

  const [onlineUsers, setOnlineUsers] = useState([])

  const getOnlineUsers = async () => {
    try {
      const res = await fetch("/api/online-users")
      const data = await res.json()
      setOnlineUsers(data)
    } catch (error) {
      console.log(error)
      alert("An error occured while finding online users")
    }
  }

  useEffect(() => {
    authorize()
    if (loginStatus) {
      socket.emit("connectUser", userName)
      getOnlineUsers()
    }
  }, [loginStatus])



  return (
    <>
      { loginStatus ? <><Navbar setLoginStatus={ setLoginStatus } onlineUsers={ onlineUsers } /><ChatRoom userName={ userName } getOnlineUsers={ getOnlineUsers } /></> : <Login setLoginStatus={ setLoginStatus } setUserName={ setUserName } /> }
    </>
  )
}

export default App

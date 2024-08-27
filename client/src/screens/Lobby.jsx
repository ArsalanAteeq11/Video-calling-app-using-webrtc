import React, { useState ,useCallback, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
    const [email, setEmail] = useState('')
    const [room,setRoom] = useState('')
    const navigate = useNavigate()

    const socket = useSocket()

    const handleSubmit = useCallback((e)=>{
        e.preventDefault()
        socket.emit("room:join" , {email,room})
    },[email,room ,socket]
    )
     

    const handleJoinRoom = useCallback((data)=>{
      const {email,room} = data;
      navigate(`/room/${room}`)

    },[navigate])
    useEffect(()=>{
      socket.on("room:join", handleJoinRoom)

      return()=>{
        socket.off("room:join" ,handleJoinRoom)
      }
    },[socket,handleJoinRoom])
  return (
    <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Id</label>
            <input type="text" name="" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <br />
            <label htmlFor="room">Room No</label>
            <input type="text" name="" id="room" value={room} onChange={(e)=>setRoom(e.target.value)}/>
            <button>join</button>
        </form>
    </div>
  )
}

export default Lobby
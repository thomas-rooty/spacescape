import { useEffect } from 'react'
import io from 'socket.io-client'

export const SocketManager = () => {
  const socket = io('http://localhost:3001')

  useEffect(() => {
    function onConnect() {
      console.log('connected')
    }

    function onDisconnect() {
      console.log('disconnected')
    }

    function onAstronauts(astronaut: any) {
      console.log(astronaut)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('astronauts', onAstronauts)
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('astronauts', onAstronauts)
    }
  }, [])

  return null
}

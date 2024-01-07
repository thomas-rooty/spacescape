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

    function onHello() {
      console.log('hello')
    }

    // Corrected event name from 'connection' to 'connect'
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('hello', onHello)

    return () => {
      // Corrected event name from 'connection' to 'connect'
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('hello', onHello)
    }
  }, [])

  return null
}

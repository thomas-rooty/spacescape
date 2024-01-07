import io from 'socket.io-client'
import { useEffect } from 'react'
import { createAstronautSlice } from '@/utils/stores/astronauts.store'
import { createSocketSlice } from '@/utils/stores/socket.store'



export const SocketManager = () => {
  const socket = io('http://localhost:3001')
  const setSocket = createSocketSlice((state) => state.setSocket)
  const setAstronauts = createAstronautSlice((state) => state.setAstronauts)

  useEffect(() => {
    setSocket(socket)
    function onConnect() {
      console.log('connected')
    }

    function onDisconnect() {
      console.log('disconnected')
    }

    function onAstronauts(astronauts: any) {
      setAstronauts(astronauts)
      console.log(astronauts)
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

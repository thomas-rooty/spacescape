import io from 'socket.io-client'
import { useEffect } from 'react'
import { createAstronautSlice } from '@/utils/stores/astronauts.store'

export const SocketManager = () => {
  const socket = io('http://localhost:3001')
  const setAstronauts = createAstronautSlice((state) => state.setAstronauts)

  useEffect(() => {
    function onConnect() {
      console.log('connected')
    }

    function onDisconnect() {
      console.log('disconnected')
    }

    function onAstronauts(astronauts: any) {
      console.log(astronauts)
      setAstronauts(astronauts)
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

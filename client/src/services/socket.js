import io from 'socket.io-client'

export const socket = io(`ws://${ process.en.NODE_ENV === 'production' ? "um-toothpoly.herokuapp.com:" + process.env.PORT : "localhost:5000"})`, { transports : ['websocket'] })
// @ts-nocheck
import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const port = process.env.PORT

const server = createServer(app)
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173',
	},
})

io.on('connection', (socket) => {
	console.log('a user connected')
	socket.on('chat message', (msg) => {
		socket.broadcast.emit('chat message', msg)
	})
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg)
	})
})

server.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})

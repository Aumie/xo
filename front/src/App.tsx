import { io, Socket } from 'socket.io-client'

import './App.css'
import { useEffect, useState } from 'react'

const SOCKET_SERVER = 'http://localhost:3000'
let socket: Socket
socket = io(SOCKET_SERVER)

function App() {
	const [txt, setTxt] = useState(String)
	const [msgList, setMsgList] = useState(Array<String>)
	function submit(e: any): void {
		e.preventDefault()
		if (txt) {
			socket.emit('chat message', txt)
			setMsgList((old) => [...old, txt])
			setTxt('')
            console.log(document.body.clientHeight);
			document.body.scrollIntoView({ behavior: "smooth", inline: 'end', block: 'end'});
		}
	}

	useEffect(() => {
		socket.on('chat message', (msg: String) => {
			setMsgList((old) => [...old, msg])
            document.body.scrollIntoView({ behavior: "smooth", inline: 'end', block: 'end'});
		})
	}, [])

	return (
		<>
			<ul id='messages'>
				{msgList.map((m, i) => (
					<li key={i}>{m}</li>
				))}
			</ul>
			<form id='form' action='' onSubmit={submit}>
				<input
					id='input'
					autoComplete='off'
					value={txt}
					onChange={(e) => setTxt(e.target.value)}
                    autoFocus
				/>
				<button>Send</button>
			</form>
		</>
	)
}

export default App

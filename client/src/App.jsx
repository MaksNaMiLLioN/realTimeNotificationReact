import {useState, useEffect} from 'react'
import './app.css'
import Navbar from './components/navbar/Navbar'
import Card from './components/card/Card'
import {posts} from './data'
const { io } = require("socket.io-client");

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user)

  }, [socket, user])

  return (
    <div className="container">
      { user ? (
        <>
        <Navbar socket={socket}/>
        {
        posts.map(post => (
          <Card post = {post} key={post.id} socket={socket} user={user}/>
        ))
        }

        <span className="username">{user}</span>
        </>
      ) : (
          <div className="login">
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={()=>setUser(username)}>Login</button>
          </div>
      )
    }

    </div>
  );
}

export default App;

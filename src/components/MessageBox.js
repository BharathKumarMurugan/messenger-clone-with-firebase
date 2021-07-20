import React, { useState, useEffect } from 'react'
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import { FormControl, Input, IconButton } from '@material-ui/core';
import db from '../config/firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './messageBox.css';


function MessageBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(()=>{
    db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc =>( 
        {
          text: doc.data().message,
          username: doc.data().username,
          id: doc.id
        }
      )))
      // setMessages(snapshot.docs.map(doc => doc.data()))
    })
  },[])
  
  useEffect(() => {
    setUsername(prompt('Enter your name'));
  }, [])

  const sendMessage = (e) =>{
    e.preventDefault();
    // send message
    db.collection('messages').add({
      message: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      username: username
    })
    // setMessages([...messages, {username: username, message: input}]);
    setInput('');
  }

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <FlipMove>
        {
          messages.map((msg)=>(
            <Message key={msg.id} user={username} message={msg} />
          ))
        }
      </FlipMove>
      <form className="messagebox__form">
        <FormControl className="messagebox__formControl">
          <Input className="messagebox__input" placeholder="Type a message" value={input} onChange={(e)=> setInput(e.target.value)} />
          <IconButton className="messagebox__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  )
}

export default MessageBox

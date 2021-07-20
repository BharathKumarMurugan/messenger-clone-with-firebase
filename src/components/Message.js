import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './message.css';

const Message = forwardRef (({user, message}, ref) =>{
  const isUser = user === message.username;
  return (
    <div ref={ref} className={`message__card ${isUser && 'message__user'}`}>
      <Card className={isUser ? "message__userCard": "message__guestCard"}>
        <CardContent className="message__cardContent">
          <Typography className="message__typo_username">
          { !isUser && `${message.username || "anonymous user"}`}
          </Typography>
          <Typography
            // color="primary"
            >
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
})

export default Message

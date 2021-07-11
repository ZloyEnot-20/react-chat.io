import React from 'react';
import Message from './Message';
import socket from '../socket';

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState('');

  const inputEl = React.useRef(null);
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
      time: `${new Date().getHours()} : ${new Date().getMinutes()}`,
    });
    onAddMessage({
      userName,
      text: messageValue,
      time: `${new Date().getHours()} : ${new Date().getMinutes()}`,
    });
    setMessageValue('');
  };

  const send = (e) => {
    console.log(userName, messages );
    if (e.keyCode === 13) {
      e.preventDefault();
      onSendMessage();
    }
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);
console.log(users, messages, userName, roomId)
  return (
    <div className="chat-app">
      <div className="chat">
        <div className="users-menu">
          <div className="users-number">Online: ({users.length})</div>
          <hr />
          <div className="users-in-room">
            {users &&
              users.map((item, inx) => {
                return (
                  <div
                    className="user"
                    // style={{
                    //   background:
                    //     item === room.currentUser ? 'yellowgreen' : '',
                    // }}
                    onClick={() => {
                      if (
                        item !==
                        roomId.get('users')[roomId.get('users').length - 1]
                      ) {
                        inputEl.current.value = item + ', ';
                        inputEl.current.focus();
                      }
                    }}
                  >
                    <div
                      className="logo"
                      // style={{
                      //   background: color(),
                      // }}
                    >
                      {item[0].toUpperCase()}
                    </div>
                    <div className="user-status">
                      <span className="name" key={(item, inx)}>
                        {item}
                      </span>
                      <span className="status" key={(item, inx + 1)}>
                        Online
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="wrapper">
          <header className="room-info">{roomId}</header>

          <div className="message-area" ref={messagesRef}>
            {
              messages.map((item, inx) => {
                return (
                  <Message
                    own={userName === messages[inx].userName}
                    userName={userName}
                    roomId={roomId}
                    item={item}
                    inx={inx}
                  ></Message>
                );
              })}
          </div>
          <div className="text-area">
            <input
              value={messageValue}
              placeholder="Message..."
              ref={inputEl}
              onKeyUp={send}
              onChange={(e) => setMessageValue(e.target.value)}
              className="messages"
            />
            <button className="btn" onClick={onSendMessage}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React from 'react';


const Message = ({ item, inx, userName, own }) => {
  return (
    <div>
      <div
        className="message-place"
        style={{
          justifyContent: own ? 'flex-end' : 'flex-start',
        }}
      >
        <div className="wrapperMsg">
          <p
            key={(item, inx)}
            className="msg"
            style={{
              borderBottomLeftRadius: own && '10px',
              borderBottomRightRadius: own && '0px',
              color: 'black',
              backgroundColor: own && '#b8c6db',
              backgroundImage:
                own && 'linear-gradient(315deg,#b8c6db 0%, #f5f7fa 74%)',
            }}
          >
          
            {item.text}
            <span className="time">{item.time}</span>
          </p>
          <span className="user-name">{item.userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;

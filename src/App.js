import React from 'react';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import socket from './socket';
import axios from 'axios';
import reducer from './components/reducer';
function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });


  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`https://server-io.herokuapp.com/rooms/${obj.roomId}`);
//     setUsers(data.users);
      dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

const addMessage = (message) => {
  dispatch({
    type: 'NEW_MESSAGE',
    payload: message,
  });
};

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  //

  return (
    <div className="App">
      {!state.joined ? (
        <Login
          onLogin={onLogin}
          state={state}
          // setRoom={setRoom}
        />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;

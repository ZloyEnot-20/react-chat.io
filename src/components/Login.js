import React from 'react';
import '../components/Login.css';
import axios from 'axios';


const Login = ({ onLogin }) => {
 const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="login_wrapper">
    <form className="login_form">
    <h1>Login</h1>
      <input
        type="text"
        className="id_input"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="name_input"
      />
      <button disabled={isLoading} onClick={onEnter} className="enter_room">
        {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </button>
</form>
    </div>
  );
   
};

export default Login;

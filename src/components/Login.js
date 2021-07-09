import React from 'react';
import '../components/Login.css';
import axios from 'axios';


const Login = ({ state, setRoom, onLogin }) => {
  const roomId = React.useRef(null);
  const userName = React.useRef(null);
  
//   const [auth, setAuth] = React.useState(false)

  const sendData = async() => {
    
    if (roomId.current.value && userName.current.value) {
//       setAuth(prev => !prev)
      // setRoom({
      //   roomId: roomId.current.value,
      //   userName: userName.current.value,
      // });
      // setUsers((prev) => [
      //   ...prev,
      //   { name: userName.current.value, status: 'Online', color: color() },
      //   { name: 'Dinora', status: 'Busy', color: color() },
      // ]);
    
     const obj = {
       roomId: roomId.current.value,
       userName: userName.current.value,
     };
      console.log(obj)
//  await axios({
//       method: 'post',
//       url: 'https://server-io.herokuapp.com/users',
//       data: {
//         obj
//       },
//    onLogin(obj)
//     })
     await axios
       .post('https://server-io.herokuapp.com/users',obj)
       onLogin(obj)
    }
    return false;
  };

 
  return (
    <div className="login_wrapper">
      <form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Login</h1>

        <input
          ref={roomId}
          type="text"
          placeholder="Room Id"
          className="id_input"
          required
        />

        <input
          ref={userName}
          type="text"
          placeholder="Your name"
          className="name_input"
          required
        />

        <input
          type="submit"
          value='Join'
          // disabled={auth}
          onClick={sendData}
          className="enter_room"
        />
          
       
      </form>
    </div>
  );
   
};

export default Login;

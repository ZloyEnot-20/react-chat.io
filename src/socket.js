import io from 'socket.io-client';
const socket = io('https://server-chat-io.herokuapp.com/');
export default socket

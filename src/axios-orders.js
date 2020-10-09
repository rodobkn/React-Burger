import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f098a.firebaseio.com/'
});

export default instance;
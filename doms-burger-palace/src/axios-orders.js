// this is used to implement 'instances' of axios

// used for firebase back-end

import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://dom-s-burger-palace-default-rtdb.firebaseio.com/'
})

export default instance
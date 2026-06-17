 import axios from 'axios';
 axios.defaults.baseURL = 'http://snakeserver.tech:5555'
 export function testCom() {
    axios.get('/test').then((response) => {
      console.log(response.data);
    });
  }
  export function newRegister(newPackage) {
    axios.post('/register', newPackage).then((response) => {
      console.log(response.data);
    });
  }
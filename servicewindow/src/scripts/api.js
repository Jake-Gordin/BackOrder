 import axios from 'axios';
 export function testCom() {
    axios.get('http://snakeserver.tech:5555').then((response) => {
      console.log(response.data);
    });
  }
  export function newRegister(newPackage) {
    axios.put('http://snakeserver.tech/register:5555', newPackage).then((response) => {
      console.log(response.data);
    });
  }
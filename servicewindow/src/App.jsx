import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const testCom = () => {
    axios.get('http://snakeserver.tech:5555').then((response) => {
      console.log(response.data);
    });
  }
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setIsOpen(true)}
        >
          Login
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => setIsOpen(true)}
        >
          Register
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => setIsOpen(true)}
        >
          Continue as Guest
        </button>
        <button
          type="button"
          className="counter"
          onClick={testCom}
        >
          Test Communications
        </button>
        
      </section>
    </>
  )
}
export default App

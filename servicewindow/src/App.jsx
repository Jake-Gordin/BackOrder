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
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
{showRegister ? <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form>
        <button className="btn" onClick={() => setShowRegister(false)}>Close</button>
      </form>
    </div>
  </div>
</dialog> : null
}
  <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label></label>
          <input type="email" className="input" placeholder="Username" />
          <input type="password" className="input" placeholder="Password" />
          <button className="btn btn-neutral mt-4">Login</button>
          <button className="btn btn-neutral mt-4" onClick={() => setShowRegister(true)}>Register</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
export default App

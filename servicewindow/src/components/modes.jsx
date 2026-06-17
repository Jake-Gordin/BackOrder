import { useState } from 'react'
import { newRegister, testCom } from '../scripts/api'
export function FrontPageBox({updatePage}) {
    const [showRegister, setShowRegister] = useState(false);
    return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Ready to Rock?</h1>
        <p className="py-6">
            We sell guitars and guitar accessories. Click below to see our inventory!
        </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <fieldset className="fieldset">
            <label>Inventory Managers</label>
            <input type="text" className="input" placeholder="Username" />
            <input type="password" className="input" placeholder="Password" />
            <button className="btn btn-neutral mt-4" onClick={() => testCom()}>Login</button>
            <div className="divider"></div>
            <label>New Managers Register Here</label>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('register')}>Register</button>
            { showRegister && <button className="btn btn-neutral mt-4" onClick={() => setShowRegister(false)}>Test</button>}
            </fieldset>
        </div>
        </div>
    </div>
    </div>
    )
}
export function RegisterBox({updatePage}) {
    const [newFirst, setNewFirst] = useState('');
    const [newLast, setNewLast] = useState('');
    const [newUser, setNewUser] = useState('');
    const [newPass, setNewPass] = useState('');
    const changeFirst = (e) => {
        setNewFirst(e.target.value);
    }
    const changeLast = (e) => {
        setNewLast(e.target.value);
    }
    const changeUser = (e) => {
        setNewUser(e.target.value);
    }
    const changePass = (e) => {
        setNewPass(e.target.value);
    }
    function prepRegisterPackage() {
        const newPackage = {
            first : newFirst,
            last : newLast,
            user : newUser,
            pass : newPass
        }
        newRegister(newPackage);
    }
    return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Welcome Aboard.</h1>
        <p className="py-6">
            Please fill out the below information. Usernames must be unique.
        </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <fieldset className="fieldset">
            <label></label>
            <input id="newFirstField" type="text" onChange={changeFirst} className="input" placeholder="First Name" />
            <input id="newLastField" type="text" onChange={changeLast} className="input" placeholder="Last Name" />
            <input id="newUserField" type="text" onChange={changeUser} className="input" placeholder="Username" />
            <input id="newPassField" type="password" onChange={changePass} className="input" placeholder="New Password" />
            <button className="btn btn-neutral mt-4" onClick={() => prepRegisterPackage()}>Register</button>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('main')}>Cancel</button>
            </fieldset>
        </div>
        </div>
    </div>
    </div>
    )
}
import { useState } from 'react';
import axios from 'axios';
export function FrontPageBox({updatePage}) {
    const [showRegister, setShowRegister] = useState(false);
    const [fieldUser, setUser] = useState('');
    const [fieldPass, setPass] = useState('');
    const changeUser = (e) => {
        setUser(e.target.value);
    }
    const changePass = (e) => {
        setPass(e.target.value);
    }
    function login(newLogin) {
        console.log("preparing to transmit");
        axios.post('/login', newLogin).then((response) => {
            console.log("response received");
            const loginResult = response.data;
            console.log("received login response: " + loginResult)
        })
    }
    function prepLogin() {
        const loginPackage = {
            user : fieldUser,
            pass : fieldPass
        }
        //console.log("prepped login package");
        login(loginPackage);
        }
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
            <input type="text" className="input" onChange={changeUser} placeholder="Username" />
            <input type="password" className="input" onChange={changePass} placeholder="Password" />
            <button className="btn btn-neutral mt-4" onClick={() => prepLogin()}>Login</button>
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
    const [ShowRegMessage, setShowRegMessage] = useState(false);
    const [regMessage, setRegMessage] = useState('');
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
    function newRegister(newPackage) {
        axios.post('/register', newPackage).then((response) => {
            const regResult = response.data;
            if (regResult === 'ER_DUP_ENTRY') {
                //show message saying that the username is duped
                setShowRegMessage(true);
                setRegMessage('Username already exists. Please input a unique username.');
            }
            else if (regResult === "REGISTRATION_OK"){
                //show registration successful and maybe a short timer before moving to inventory as new user
                setShowRegMessage(false);
            }
    })
    }
    function prepRegister() {
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
            {ShowRegMessage && <label>{regMessage}</label>}
            <input id="newFirstField" type="text" onChange={changeFirst} className="input" placeholder="First Name" />
            <input id="newLastField" type="text" onChange={changeLast} className="input" placeholder="Last Name" />
            <input id="newUserField" type="text" onChange={changeUser} className="input" placeholder="Username" />
            <input id="newPassField" type="text" onChange={changePass} className="input" placeholder="New Password" />
            <button className="btn btn-neutral mt-4" onClick={() => prepRegister()}>Register</button>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('main')}>Cancel</button>
            </fieldset>
        </div>
        </div>
    </div>
    </div>
    )
}
import { useState } from 'react';
import axios from 'axios';
export function FrontPageBox({updatePage, updateUser}) {
    const [showRegister, setShowRegister] = useState(false);
    const [fieldUser, setUser] = useState('');
    const [fieldPass, setPass] = useState('');
    const [ShowLoginMessage, setShowLoginMessage] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const changeUser = (e) => {
        setUser(e.target.value);
    }
    const changePass = (e) => {
        setPass(e.target.value);
    }
    function login(newLogin) {
        //console.log("preparing to transmit");
        axios.post('/login', newLogin).then((response) => {
            //console.log("response received");
            const loginResult = response.data;
            if (loginResult.currentUser === undefined) {
                setShowLoginMessage(true);
                setLoginMessage("User does not exist. Please register as a new manager.");
            }
            else if (loginResult.currentUser === "BAD_PASS") {
                setShowLoginMessage(true);
                setLoginMessage("Incorrect Password!");
            }
            else {
                updateUser(loginResult.currentUser);
                setShowLoginMessage(false);
                updatePage('inventory');
            }
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
        <button className="btn btn-neutral mt-4" onClick={() => updatePage('inventory')}>Continue</button>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <fieldset className="fieldset">
            {ShowLoginMessage && <label>{loginMessage}</label>}
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
export function RegisterBox({updatePage, updateUser}) {
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
            else {
                //show registration successful and maybe a short timer before moving to inventory as new user
                setShowRegMessage(false);
                updateUser(regResult.currentUser);
                updatePage('inventory');
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
export function InventoryList({updatePage, currentUser}) {
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            {/* This is where items will be populated*/}
            {function populateItems() {
                if (currentUser === "Guest") {
                    axios.get('/items').then((response) => {
                    const regResult = response.data;
                        regResult.forEach(element => {
                            return (
                                <label>{element.ID} {element.User_ID} {element.Item_Name} {element.Description} {element.Quantity}</label>
                            )
                        });
                    })
                }
            }}
            {(currentUser != "Guest") && <button className="btn btn-neutral mt-4" onClick={() => updatePage('addItem')}>New Item</button>}
            <div className="divider"></div>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('main')}>Back</button>
        </div>
        </div>
        </div>
    )
}
export function AddItem({updatePage, currentUser}) {
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [addItemMessage, setAddItemMessage] = useState('');
    const [showAddItemMessage, setShowAddItemMessage] = useState(false);
    const changeName = (e) => {
        setNewName(e.target.value);
    }
    const changeDescription = (e) => {
        setNewDescription(e.target.value);
    }
    const changeQuantity = (e) => {
        setNewQuantity(e.target.value);
    }
    function newItem(newPackage) {
        axios.post('/NewItem', newPackage).then((response) => {
            const itemResult = response.data;
            if (itemResult === 'ITEM_ADD_OK') {
                updatePage('inventory');
                setShowAddItemMessage(false);
            }
            else {
                setAddItemMessage('Error! Check item parameters and try again.');
                setShowAddItemMessage(true);
            }
    })
    }
    function prepItem() {
        const newPackage = {
            user : currentUser,
            name : newName,
            description : newDescription,
            quantity : newQuantity
        }
        console.log("sending package: " + newPackage.name);
        newItem(newPackage);
        }
    return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Add New Item</h1>
        <p className="py-6">
            Fill out the item parameters below.
        </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <fieldset className="fieldset">
            {showAddItemMessage && <label>{addItemMessage}</label>}
            <input id="newFirstField" type="text" onChange={changeName} className="input" placeholder="Item Name" />
            <textarea className="textarea" placeholder="Item Description" onChange={changeDescription}></textarea>
            <input id="newLastField" type="number" min="0" step="1" max="10000" onChange={changeQuantity} className="input" placeholder="Quantity" />
            <button className="btn btn-neutral mt-4" onClick={() => prepItem()}>Add</button>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('inventory')}>Cancel</button>
            </fieldset>
        </div>
        </div>
    </div>
    </div>
    )
}
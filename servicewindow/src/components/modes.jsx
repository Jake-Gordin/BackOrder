import { useEffect, useState } from 'react';
import axios from 'axios'
export function ItemDetails({item, loggedID, updatePage}) {
    const [editModeActive, setEditModeActive] = useState(false);
    const [newName, setNewName] = useState(item.name);
    const [newQuantity, setNewQuantity] = useState(item.quantity);
    const [newDescription, setNewDescription] = useState(item.description);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const changeName = (e) => {
        setNewName(e.target.value);
        setShowSavedMessage(false);
    }
    const changeQuantity = (e) => {
        setNewQuantity(e.target.value);
        setShowSavedMessage(false);
    }
    const changeDescription = (e) => {
        setNewDescription(e.target.value);
        setShowSavedMessage(false);
    }
    function saveItem() {
        const newPackage = {
            id : item.id,
            name : newName,
            description : newDescription,
            quantity : newQuantity
        }
        axios.put('/items', newPackage).then((response) => {
            const itemResult = response.data;
            if (itemResult === 'ITEM_EDIT_OK') {
                setShowSavedMessage(true);
                setEditModeActive(false);
                updatePage('inventory');
                console.log('item updated')
            }
            else {
                console.log("item edit error");
            }
        })
    }
    function deleteItem() {
        const newPackage = {
            id : item.id,
        }
        axios.delete('/items', newPackage).then((response) => {
            const itemResult = response.data;
            if (itemResult === 'ITEM_DELETE_OK') {
                setEditModeActive(false);
                updatePage('inventory');
                console.log('item deleted')
            }
            else {
                console.log("item delete error");
            }
        })
    }
    return (
            <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
             <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    {loggedID > 0 && <th>Edit Item</th>}
                    {loggedID > 0 && <th>Delete Item</th>}
                    <th>Cancel</th>
                </tr>
                </thead>
                <tbody>
                    <tr key={item.id + "details"}>
                    {editModeActive == false && <th>{item.name}</th>}
                    {editModeActive && <td><input type="text" onChange={changeName} className="input" value={newName}/></td>}
                    {editModeActive == false && <td>{item.description}</td>}
                    {editModeActive && <td><textarea className="textarea" value={newDescription} onChange={changeDescription}></textarea></td>}
                    {editModeActive == false && <td>{item.quantity}</td>}
                    {editModeActive && <td><input type="text" onChange={changeQuantity} className="input" value={newQuantity}/></td>}
                    {loggedID > 0 && editModeActive == false && <td><button className="btn btn-neutral mt-4" onClick={()=>setEditModeActive(true)}>Edit</button></td>}
                    {loggedID > 0 && editModeActive && <td><button className="btn btn-neutral mt-4" onClick={()=>{saveItem()}}>Save</button></td>}
                    {loggedID > 0 && <td><button className="btn btn-neutral mt-4" onClick={()=>{deleteItem()}}>Delete</button></td>}
                    <td><button className="btn btn-neutral mt-4" onClick={()=>{setEditModeActive(false), setShowSavedMessage(false), updatePage('inventory')}}>Cancel</button></td>
                    </tr>
                </tbody>
            </table>
            <div className="modal-action">
            <form method="dialog">
                {showSavedMessage && <label>Changes saved!</label>}
                
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
    )
}
function ItemListEntry({item, updatePage, setDetailItem}) {
    const detailsID = (item.id +"Details");
    return (
    <tr key={item.id}>
        <th>{item.name}</th>
        <td>{item.shortDescription}</td>
        <td>{item.quantity}</td>
        <td><button className="btn btn-neutral mt-4" onClick={()=> {updatePage('details'), setDetailItem(item)}}>View</button></td>
    </tr>
    )
}
export function FrontPageBox({updatePage, updateUser, updateUserID, updateRegistrationStatus, currentRegistrationStatus}) {
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
                updateUserID(loginResult.currentID);
                setShowLoginMessage(false);
                updateRegistrationStatus(false);
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
            {currentRegistrationStatus && <label>Registration successful! Please login below.</label>}
            <label>Inventory Managers</label>
            <input type="text" className="input" onChange={changeUser} placeholder="Username" />
            <input type="password" className="input" onChange={changePass} placeholder="Password" />
            <button className="btn btn-neutral mt-4" onClick={() => prepLogin()}>Login</button>
            <div className="divider"></div>
            <label>New Managers Register Here</label>
            <button className="btn btn-neutral mt-4" onClick={() => updatePage('register')}>Register</button>
            </fieldset>
        </div>
        </div>
    </div>
    </div>
    )
}
export function RegisterBox({updatePage, updateUser, updateRegistrationStatus}) {
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
                //updateUser(regResult.currentUser);
                updatePage('main');
                updateRegistrationStatus('true');
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
export function InventoryList({updatePage, currentUser, currentID, setDetailItem}) {
    const [items, setItems] = useState([]);
    const [inventoryLabel, setInventorylabel] = useState('');
    var itemList = [];
    useEffect(() => {
        //no user logged in
        if (currentUser === "Guest") {
            setInventorylabel("All items:");
            //console.log("transmitting")
            axios.get('/items').then((response) => {
                const regResult = response.data;
                //console.log(regResult);
                regResult.forEach(element => {
                    var shortDescription = '';
                    if (element.Description.length > 100) {
                        shortDescription = (element.Description.slice(0, 100) + "...");
                    }
                    else {
                        shortDescription = element.Description;
                    }
                    itemList.push({id: element.ID, user: element.User_ID, name: element.Item_Name, description: element.Description, shortDescription: shortDescription, quantity: element.Quantity})
                });
                setItems(itemList);
            })
        }
        //user name / id are in state
        else {
            setInventorylabel("Items created by " + currentUser + ":");
            const itemRequest = {
                id: currentID 
            }
            //console.log("pulling selective inventory for: " + itemRequest.id)
            axios.post('/users/items', itemRequest).then((response) => {
                const regResult = response.data;
                //console.log(regResult);
                regResult.forEach(element => {
                    var shortDescription = '';
                    if (element.Description.length > 100) {
                        shortDescription = (element.Description.slice(0, 100) + "...");
                    }
                    else {
                        shortDescription = element.Description;
                    }
                    itemList.push({id: element.ID, user: element.User_ID, name: element.Item_Name, description: element.Description, shortDescription: shortDescription, quantity: element.Quantity})
                });
                setItems(itemList);
            })
        }
    }, [currentUser])
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <ItemListEntry item={item} updatePage={updatePage} setDetailItem={setDetailItem} key={item.id}/>
                ))}
                </tbody>
            </table>
            {items.length === 0 && <span className="loading loading-spinner loading-xs"></span>}
        </div>
            {(currentUser !== "Guest") && <button className="btn btn-neutral mt-4" onClick={() => updatePage('addItem')}>New Item</button>}
            <div className="divider"></div>
            {currentUser === "Guest" &&<button className="btn btn-neutral mt-4" onClick={() => updatePage('main')}>Back</button>}
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
        axios.post('/items', newPackage).then((response) => {
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
        //console.log("sending package: " + newPackage.name);
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

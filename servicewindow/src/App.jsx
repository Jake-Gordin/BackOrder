import { useState } from 'react'
import { FrontPageBox, RegisterBox, InventoryList, AddItem }  from './components/modes'
import { testCom } from './scripts/api'
import './App.css'
export default function App() {
  const [activePage, setActivePage] = useState('main');
  const [activeUser, setActiveUser] = useState('Guest');
  const [activeUserID, setActiveUserID] = useState(0);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  function logOut() {
    setActiveUser('Guest');
    setActiveUserID(0);
    setActivePage('main');
  }
  return (
    <>
    {activeUser != "Guest" && <label>Currently logged in as: {activeUser}</label>}
    <div className="divider"></div>
    {activeUser != "Guest" && <button className="btn btn-neutral mt-2" onClick={() => logOut()}>Logout</button>}
    {activePage === 'main' && <FrontPageBox updateUserID = {setActiveUserID} currentRegistrationStatus = {registrationStatus} updateRegistrationStatus = {setRegistrationStatus} updatePage={setActivePage} updateUser={setActiveUser} />}
    {activePage === 'register' && <RegisterBox updateRegistrationStatus = {setRegistrationStatus} updatePage={setActivePage} updateUser={setActiveUser} />}
    {activePage === 'inventory' && <InventoryList updatePage={setActivePage} currentID = {activeUserID} currentUser={activeUser} />}
    {activePage === 'addItem' && <AddItem updatePage={setActivePage} currentUser={activeUser} />}
    </>
  )
}
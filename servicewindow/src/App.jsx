//imports
import {useState} from 'react';
import {FrontPage, Register, InventoryList, AddItem, ItemDetails} from './components/modes';
import './App.css';
//main app
export default function App() {
  const [activePage, setActivePage] = useState('main');
  const [activeUser, setActiveUser] = useState('Guest');
  const [activeUserID, setActiveUserID] = useState(0);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [detailItem, setDetailItem] = useState(undefined);
  //main paging
  return (
    <>
    {activePage === 'main' && <FrontPage 
      updateUserID = {setActiveUserID} 
      currentRegistrationStatus = {registrationStatus} 
      updateRegistrationStatus = {setRegistrationStatus} 
      updatePage={setActivePage} 
      updateUser={setActiveUser} 
    />}
    {activePage === 'register' && <Register
      updateRegistrationStatus = {setRegistrationStatus} 
      updatePage={setActivePage} 
      updateUser={setActiveUser} 
    />}
    {activePage === 'inventory' && <InventoryList 
      updatePage={setActivePage} 
      setDetailItem={setDetailItem} 
      currentID = {activeUserID} 
      currentUser={activeUser} 
      setActiveUser={setActiveUser} 
      setActiveUserID={setActiveUserID} 
    />}
    {activePage === 'addItem' && <AddItem 
      updatePage={setActivePage} 
      currentUser={activeUser} 
    />}
    {activePage === 'details' && <ItemDetails 
      updatePage={setActivePage} 
      loggedID = {activeUserID} 
      updatePage={setActivePage} 
      item={detailItem} 
    />}
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
    <p>Created 2026 by 2d Lt George Gordin for Supra Coders practical exam</p>
    </aside>
    </footer>
    </>
  )
}
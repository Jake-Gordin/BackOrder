import { useState } from 'react'
import { FrontPageBox, RegisterBox }  from './components/modes'
import { testCom } from './scripts/api'
import './App.css'
export default function App() {
  const [activePage, setActivePage] = useState('main');
  const [activeUser, setActiveUser] = useState('Guest');
  return (
    <>
    <label>{activeUser}</label>
    {activePage === 'main' && <FrontPageBox updatePage={setActivePage} updateUser={setActiveUser} />}
    {activePage === 'register' && <RegisterBox updatePage={setActivePage} updateUser={setActiveUser} />}
    </>
  )
}

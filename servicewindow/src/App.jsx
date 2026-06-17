import { useState } from 'react'
import { FrontPageBox, RegisterBox }  from './components/modes'
import { testCom } from './scripts/api'
import './App.css'
export default function App() {
  const [activePage, setActivePage] = useState('main');
  return (
    <>
    {activePage === 'main' && <FrontPageBox updatePage={setActivePage}></FrontPageBox>}
    {activePage === 'register' && <RegisterBox updatePage={setActivePage} />}
    </>
  )
}

import React, { useEffect } from 'react'
import { images } from './db/images'
import './App.css';
import  {BrowserProvider, useBrowser } from './context/browsercontext';
import Home from './component/Home';
import Task from './component/Task';
const index=Math.floor(Math.random()*images.length);
const bgImage=images[index].image;
function App() {

  const {name,BrowserDispatch}=useBrowser();
  useEffect(()=>{
    const username=localStorage.getItem("name");
       //setName(username);
       BrowserDispatch({
        type:"NAME",
        payload:username
       })
  },[])
  return (
    <div className='main-container' style={{backgroundImage:`URL("${bgImage}")`}}>
       {name?<Task/>:<Home/>}
   </div>
  )
}

export default App
import React, { useState } from 'react'
import { useBrowser } from '../context/browsercontext';

function Home() {
   const{name,BrowserDispatch}=useBrowser();

   const[valu,setValue]=useState("");


   const handleChange=(e)=>{
    setValue(e.target.value);
   }

   const handleSubmit=(e)=>{
       e.preventDefault();
      // setName(valu);
       BrowserDispatch({
        type:"NAME",
        payload:valu
       })
       localStorage.setItem("name",valu);
       setValue("");
   }

   
  //console.log(valu)
  console.log(name);
  return (
    <div className='main-container'>
        <h1 className='main-heading'>
        Browser Extension
       </h1>
        <span className='main-heading-2'>Hello,What's your Name ?</span>
         <form onSubmit={handleSubmit}>
         <input type="text"  className='input' onChange={handleChange} />
         </form>
    </div>
  )
}

export default Home;
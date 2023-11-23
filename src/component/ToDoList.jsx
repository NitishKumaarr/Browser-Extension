import React, { useState } from 'react'

function TodoList({text,id,remove}) {
   const[color,setColor]=useState("");
   const ChangeColor=()=>{
    if(color==="strike"){
      setColor("");
    }
    else{
     setColor('strike');
    }
   }
   
  return (
    <div className='mylist'>
        <input type="checkbox" className='check' onClick={ChangeColor} />
        <div className={`text-color ${color}`}><h3>{text}</h3></div>
        <span class="material-symbols-outlined" style={{color:'white',cursor:"pointer"}} 
        onClick={()=>{remove(id)}}>
                 close
        </span>
    </div>
  )
}

export default TodoList
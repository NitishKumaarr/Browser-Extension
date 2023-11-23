import React, { Fragment, useEffect,useState } from 'react'
import { useBrowser } from '../context/browsercontext'
import { quotes } from '../db/quotes';
import todo from './todo';
import Todo from './todo';
const index=Math.floor(Math.random()*quotes.length);
const quote=quotes[index].quote;
function Task() {
    const {name,time,message,task,BrowserDispatch}=useBrowser();
    const [ischeck,setIsCheck]=useState(true);
    const[enable,setEnable]=useState(true);
    const[valu,setValue]=useState("");
    const getCurrentTime=()=>{
        const today=new Date();
        const hours=today.getHours();
        const minutes=today.getMinutes();

        const hour=hours<10?"0"+hours:hours;
        const minute=minutes<10?"0"+minutes:minutes;

        const currentTime=`${hour}:${minute}`
        setTimeout(getCurrentTime,1000);
         BrowserDispatch({
            type:"TIME",
            payload:currentTime
           })
           BrowserDispatch({
            type:"MESSAGE",
            payload:hour
           })
    }
    useEffect(()=>{
        getCurrentTime();
    },[time]);

    useEffect(()=>{
    const userstrike=localStorage.getItem("color");
     userstrike==="true"?setIsCheck(true):setIsCheck(false);
    },[]);
  
    const handleTask=(e)=>{
     setValue(e.target.value);
    }
    const handleTaskSubmit=(e)=>{
        e.preventDefault();
       // setName(valu);
        BrowserDispatch({
         type:"TASK",
         payload:valu
        })
       localStorage.setItem("task",valu);
       localStorage.setItem("date",new Date().getDate());
        setValue("");
    }
    useEffect(()=>{
        const usertask=localStorage.getItem("task");
      // const userstrike=localStorage.getItem("color");
        BrowserDispatch({
            type:"TASK",
            payload:usertask
           })
           if(new Date().getDate()!==Number(localStorage.getItem("date"))){
            localStorage.removeItem("task");
            localStorage.removeItem("date");
            localStorage.removeItem("color");
           }
      // setIsCheck(userstrike);
    },[])
    const strikeList=(e)=>{
        if(e.target.checked){
            setIsCheck(ischeck=>!ischeck);
            
        }
        else{
            setIsCheck(ischeck=>!ischeck);
           // localStorage.setItem("color",ischeck);
        }
        localStorage.setItem("color",!ischeck);
    }
    const RemoveTask=()=>{
        BrowserDispatch({
            type:"TASK",
            payload:""
           })
           localStorage.removeItem("task");
           localStorage.removeItem("color")
    }
    const EnableTodo=()=>{
       if(enable===true){
        setEnable(false);
       }
       else{
        setEnable(true);
       }
    }
    console.log(ischeck);
  return (
    <>
    <div className='task-container'>  
        <span className='time'>{time}</span>
        <span className='main-heading-3'>{message} {name} </span>
        { !task?
        <Fragment>
            <span className='main-heading-4'>What is the main focus for today?</span>
            <form onSubmit={handleTaskSubmit}>
                <input type="text" value={valu} className='task-input' onChange={handleTask}/>
            </form>
        </Fragment>
         :
        <div className="user-task-container">
            <span className='main-heading-4'>Today's Focus</span>
            <div className='task-list-container'>
                <input type="checkbox" id="checkbox" onClick={strikeList} checked={ischeck}/>
                <label for="checkbox" >
                <span className={`${ischeck?"task-list2":"task-list"}`}>{task}
                </span>
                </label>
                <span class="material-symbols-outlined" style={{color:'white',cursor:"pointer"}} onClick={RemoveTask}>
                 close
                </span>
            </div>
        </div>
      }
     
    </div>
       <div className="quote-container">
       <span className='task-list'>   {quote}</span>
     </div>
     <div className="set-postion">
     {enable||<Todo />}
     </div>
     <button className='set-postion-btn'onClick={EnableTodo}>ToDo</button>
   </>
  )
}

export default Task
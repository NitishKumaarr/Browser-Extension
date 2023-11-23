import React, { useEffect, useState } from 'react'
import TodoList from './ToDoList';
import {v4 as uuid} from "uuid";
function Todo() {
const[todoList,setTodoList]=useState([]);
const[todoValue,settodoValue]=useState();
  
useEffect(()=>{
 const userTodo=JSON.parse(localStorage.getItem("todolist"));
  userTodo && setTodoList(userTodo);
},[])

  const addlist=(e)=>{
      settodoValue(e.target.value);
  }
  
  const handledata=(e)=>{
     e.preventDefault();
     const item=[...todoList,{id:uuid(),todoValue,isCompleted:false}];
    // item.push(todoValue);
     setTodoList([...item]);
     settodoValue("")
     localStorage.setItem("todolist",JSON.stringify(item));
  }
  const RemoveTodoList=(id)=>{
   const list=[...todoList];
   const newlist=list.filter((obj)=>obj.id!==id);
  //  const userTodo=JSON.parse(localStorage.getItem("todolist"));
  //  const userList=userTodo.filter((obj)=>obj.id!==id);
   localStorage.setItem("todolist",JSON.stringify(newlist));
   setTodoList([...newlist]);
  }
  return (
    <>
     <div>
        {todoList.map((it)=><TodoList text={it.todoValue} id={it.id} remove={RemoveTodoList}/>)}
    </div>
    <div className="form">
      
        <form action="" onSubmit={handledata}>
          <input type="text" value={todoValue} onChange={addlist} className='take-input' required />
        </form>
    
    </div>
   
    </>
  );
};

export default React.memo(Todo);
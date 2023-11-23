import { createContext,useContext,useReducer} from "react";
import { BrowserReducer } from "../reducer/browser-reducer";

const BrowserContext=createContext();
const intialState={
    name:"",
    time:"0",
    message:"",
    task:""
}
const BrowserProvider=({children})=>{
    
    const [{name,time,message,task},BrowserDispatch]=useReducer(BrowserReducer,intialState);
    return(
        <BrowserContext.Provider value={{name,time,message,task,BrowserDispatch}}>
        {children}
        </BrowserContext.Provider>
    )
};

const useBrowser=()=>useContext(BrowserContext);


export {useBrowser,BrowserProvider};
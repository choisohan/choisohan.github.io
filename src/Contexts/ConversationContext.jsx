
import React, { useState , useContext, useEffect } from 'react'

const HistoryContext = React.createContext();
const HistoryUpdateContext = React.createContext();

export function useHistory(){
    return useContext(HistoryContext);
}
export function useUpdateHistory(){
    return useContext(HistoryUpdateContext);
}

export const ConversationContextProvider = ( {children} )=>  {
    const [history, setHistory] = useState([]); 

    const addHistory= pid =>{
        if(typeof(pid) =='string'){
            setHistory(prevArr => {
                var _arr = [...prevArr]; 
                if(_arr[_arr.length-1]!= pid){
                    _arr.push(pid)
                }
                return _arr;
            })
        }
        else if( pid == -1){
            backward()
        }
        
        else{
            setHistory(prevArr =>{
                var _arr = [...prevArr]
                return [..._arr, ...pid]
            }) 

        }
    }

    useEffect(()=>{
        if(history.length > 0 ){
            localStorage.setItem('history', JSON.stringify(history) )
        }
    },[history])



    useEffect(()=>{
        window.addEventListener('keydown', e=>{
            if(e.key=='Backspace'){
                backward()
            }
        })
    },[])
    const backward = ()=>{
        setHistory(prevArr =>{
            var arr = [...prevArr]
            if(arr.length > 0 ){
                arr.splice(prevArr.length - 1, 1)
            }
            if(arr.length== 0 ){
                arr.push('1')
            }
            return arr; 
        })
    }

   return (
        <HistoryContext.Provider value= {history}>
            <HistoryUpdateContext.Provider value= {addHistory}>
                {children}
            </HistoryUpdateContext.Provider>
        </HistoryContext.Provider>
    )
}



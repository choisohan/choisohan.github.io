
import React, { useState , useContext, useEffect } from 'react'


const PopupContentContext = React.createContext();
const PopupContentUpdateContext = React.createContext();

export function usePopupContent(){
    return useContext(PopupContentContext);
}
export function useUpdatePopupContent(){
    return useContext(PopupContentUpdateContext);
}

export const PopupContentContextProvider = ( {children} )=>  {
    const [PopupContent, setPopupContent] = useState(); 


   return (
        <PopupContentContext.Provider value= {PopupContent}>
            <PopupContentUpdateContext.Provider value= {setPopupContent}>
                {children}
            </PopupContentUpdateContext.Provider>
        </PopupContentContext.Provider>
    )
}



import React, { useEffect, useRef , Component, useState } from 'react'
import '../css/Popup.css'
import { usePopupContent, useUpdatePopupContent } from '../Contexts/PopupContext';


const Popup = () => {

    const popupRef = useRef(); 
    const content = usePopupContent(); 
    const updateContent = useUpdatePopupContent(); 

    const onScreenClicked = e =>{
        if(e.target == popupRef.current){
            updateContent(null);
        }
    }

    useEffect(()=>{
        console.log( content )
    },[content])

    if(content){
        return <div ref={popupRef} onClick={onScreenClicked} className={`popup screen `} >
        <div className='container'> {content}
        </div>
    </div>
    }
}
export default Popup
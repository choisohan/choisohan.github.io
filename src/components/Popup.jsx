import React, { useEffect, useRef , Component, useState } from 'react'
import '../css/Popup.css'



const Popup = props => {
    const popupRef = useRef(); 

    const onScreenClicked = e =>{
        if(e.target == popupRef.current){
            props.setTrigger(null);

        }
    }
    useEffect(()=>{
        console.log( props.trigger )
    },[props.trigger])

  return <>
  {
    !props.trigger ? null :
    <ul ref={popupRef} onClick={onScreenClicked} className={`popup screen `} >
        <ul className='container'>
            {props.children}
        </ul>
    </ul>
  }

  </>
}
export default Popup
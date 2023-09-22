import React, { useEffect } from 'react'
import '../css/Menu.css'


const Menu  = props =>{

    const onMouseEnter = (index)=>{
        props.onMouseEnter(index)
    }

    return <div id ='Menu'>
        {props.texts.map( (text, index) =>
            <ul key={index} className={props.pIndex == index ? 'selected':''}
                onMouseEnter={()=>{onMouseEnter(index)}}
                >{text}</ul>)}
    </div>
}

export default Menu; 

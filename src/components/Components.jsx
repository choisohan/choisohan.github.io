import { useRef, useEffect, useState  } from "react";
import { useUpdateHistory } from "../Contexts/ConversationContext";

export const TypeText = (props)=>{
    const posRef = useRef(0); 
    const [pos, setPos] = useState(0);     
  
    useEffect(()=>{
        setTimeout(()=>{
            const interval = setInterval(()=>{
                posRef.current += 1; 
                setPos(x=> x+1)
                if( posRef.current > props.children.length ){
                  clearInterval(interval)
                }
              },35)

        }, props.delay)
    },[])
  
    return <span>{props.children}</span>
    //return <span>{props.children.substring( 0 , posRef.current )}</span>;
    //children.substring( 0 , posRef.current )
  }
  


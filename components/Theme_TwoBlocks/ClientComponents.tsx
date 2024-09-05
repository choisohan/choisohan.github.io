"use client"

import { useEffect, useState , useContext } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { LayoutContext } from "../context/LayoutContext";

export const ToggleButton = (props:any) =>{
    const {layout,setLayout} = useContext(LayoutContext);
    
    return <button onClick={()=>{
        setLayout( { focusMode : layout.focusMode == true ? false: true } );
    }} className={ `${props.className} ${layout.focusMode?' clicked':''}` } >{props.children}</button>
}

export const TagButton = (props:any)=>{
    const router = useRouter(); 
    const onClick = ()=>{
        router.push(`?tags=${props.name.toLowerCase()}`)
    }
    return <button onClick={onClick}
        className={`hover-scale ${props.className}`}
    >#{props.name}</button>
}

export const DynamicStyle=()=>{
    const params =useSearchParams();
    const [styleString, setStyleString] = useState( "" );

    useEffect(()=>{
        const tagQuery = params.get('tags') ;
        var _styleString = ''
        if( tagQuery ){
            tagQuery.split('.').forEach( tag =>{
                tag = tag.toLowerCase();
                _styleString = `
                .project-preview{
                    display:none;
                }
                .project-preview.${tag}{
                    display:block;
                }
                `
            })
            setStyleString( _styleString)
            
            const openButton:any = document.querySelector('.open-menu-button');
            openButton.classList.remove('clicked')
        }
        else{
            _styleString = `.project-preview.hidden}{
                    display:block;}`;
            setStyleString(_styleString)
        }

    },[params])//whenevr refresh

    return <style>{styleString}</style>
}
"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSearchParams } from 'next/navigation'

export const ToggleButton = (props:any) =>{
    const [clicked, setClicked] = useState(false);
    return <button onClick={()=>{
        setClicked( prev =>  prev == true ? false: true );
    }} className={ `${props.className} ${clicked?' clicked':''}` } >{props.children}</button>
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
        else{setStyleString('')}

    },[params])//whenevr refresh

    return <style>{styleString}</style>
}
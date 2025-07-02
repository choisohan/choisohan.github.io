"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation";



export default function DynamicStyle(){
    const searchParams = useSearchParams(); // for `?f=1`
  //const pathname = usePathname();
  //const router = useRouter(); // for navigation (e.g. router.push)

    const [styleString, setStyleString] = useState( "" );


    useEffect(()=>{
        const tagQuery = searchParams.get('tags') ;
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
            
            //const openButton:any = document.querySelector('.open-menu-button');
            //if(openButton) openButton.classList.remove('clicked')
        }
        else{
            _styleString = `.project-preview.hidden}{
                    display:block;}`;
            setStyleString(_styleString)
        }

    },[searchParams])//whenevr refresh


    return <style>{styleString}</style>
}
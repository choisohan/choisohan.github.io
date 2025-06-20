"use client"

import { useEffect, useState , useContext } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { LayoutContext } from "../context/LayoutContext";

export const ToggleButton = (props:any) =>{
    const {layout,setLayout} = useContext(LayoutContext);
    const router = useRouter(); 
    const searchParams = useSearchParams();

    const onClick = ()=>{
        const f = layout.focusMode == true ? false: true; 
        const params = new URLSearchParams(searchParams.toString());
        if(f){
            params.set("f","1");
        }else{
            params.delete("f")
        }
        router.push(`?${params.toString()}`, { });

        setLayout( { ...layout, focusMode :  f } );

    }

    return <>
     <button onClick={onClick} className={ `open-menu-button bg-black transition-transform ${layout.focusMode?' clicked':''}` } >
        {layout.focusMode?'More':'Focus Mode'}
    </button>
    </>
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


export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-12 place-self-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          &copy; {currentYear} Choisohan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

"use client"

import { useEffect , useContext } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { LayoutContext } from "../context/LayoutContext";


export const ToggleButton = (props:any) =>{
    const {layout,setLayout} = useContext(LayoutContext);
    const router = useRouter(); 
    const searchParams = useSearchParams();

    useEffect(()=>{
        const fValue = searchParams.get("f")==="1" ? true: false ;
        if(fValue){
            setLayout({...layout, focusMode: fValue })
        }
    },[])

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
        className={`text-sm bg-gray-200 py-s px-2 ml-1 rounded-lg hover-scale ${props.className}`}
    >#{props.name}</button>
}




export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-[100px] place-self-center select-none">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          &copy; {currentYear} Choisohan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};



export const SiteName = ()=>{
    return <h1>
        Just A Human😉<br /> who Makes
    </h1>
}
"use client"

import { useEffect , useState} from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import { FaLinkedin } from 'react-icons/fa';

export const ToggleButton = (props:any) =>{
    const router = useRouter(); 
    const searchParams = useSearchParams();
    const [focusMode, setFocusMode] = useState(false); 

    useEffect(()=>{
         setFocusMode(searchParams.get("f")==="1" ? true: false); 
    },[])

    const onClick = ()=>{
        const f = focusMode == true ? false: true; 
        const params = new URLSearchParams(searchParams.toString());
        if(f){
            params.set("f","1");
        }else{
            params.delete("f")
        }
        router.push(`?${params.toString()}`, { });

        setFocusMode(f);
    }

    useEffect(()=>{
        if(focusMode){
            document.body.setAttribute('focus','true')
        }else{
            document.body.removeAttribute('focus');
        }
    },[focusMode])

    return <label className={"focusModeButton inline-flex items-center mb-5 cursor-pointer " + props.className}>
  <input type="checkbox" className="sr-only peer" checked={focusMode} onChange={onClick} />
  <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
</label>

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
    <footer className="py-6 mt-[100px] place-self-center select-none ">
                 <div className="place-self-center mb-2">
                    <SocialMediaLinks />
                 </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 flex">
          &copy; {currentYear} Choisohan. All rights reserved.     
        </div>
      </div>
    </footer>
  );
};



export const SiteName = ()=>{
    return <Link href='/'>


<p className="text-center font-serif font-extrabold text-8xl [body[type=blog]_&]:text-4xl">
        Just A Human😉
        <br />
        who Makes
</p>
        </Link>   

}


export const SocialMediaLinks = () =>{
    return <>
        <a
      href="https://www.linkedin.com/in/mingirl/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-blue-700 hover:text-blue-900"
    >
      <FaLinkedin size={24} />
    </a>
    
    </>

}
"use client"
import  { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

interface Layout {
  focusMode: Boolean,
  lightbox : ReactNode
}


// Define a type for the context value
interface LayoutContextType {
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}

// Create a default context value
const defaultLayout: LayoutContextType = {
  layout: {focusMode:false , lightbox : null},
  setLayout: () => {},
};


// Create a Context
const LayoutContext = createContext<LayoutContextType>(defaultLayout);

interface MyProviderProps {children: ReactNode;}


// Create a Provider component
const LayoutProvider: React.FC<MyProviderProps> = ({ children }) => {

  const searchParams = useSearchParams();
  const fValue = searchParams.get("f")==="1" ? true: false ;
  const [layout, setLayout] = useState<Layout>({focusMode:fValue, lightbox: null })


  return (
    <LayoutContext.Provider value={{ layout, setLayout }} >
      {children}


      {!layout.lightbox ? null :
      
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={()=>{setLayout({...layout, lightbox:null })}}>
        {layout.lightbox}
      </div> }


    </LayoutContext.Provider>
  );
};


const LayoutComponent = ()=>{

   const {layout,setLayout} = useContext(LayoutContext)

   useEffect(()=>{
    setLayout( { focusMode : true })
   },[])

   return null;
}
export { LayoutContext, LayoutProvider , LayoutComponent };
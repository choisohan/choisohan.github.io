"use client"
import  { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

interface Layout {
  focusMode: Boolean
}


// Define a type for the context value
interface LayoutContextType {
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}

// Create a default context value
const defaultLayout: LayoutContextType = {
  layout: {focusMode:false},
  setLayout: () => {},
};


// Create a Context
const LayoutContext = createContext<LayoutContextType>(defaultLayout);

interface MyProviderProps {children: ReactNode;}


// Create a Provider component
const LayoutProvider: React.FC<MyProviderProps> = ({ children }) => {

  const searchParams = useSearchParams();
  const fValue = searchParams.get("f")==="1" ? true: false ;
  const [layout, setLayout] = useState<Layout>({focusMode:fValue})


  return (
    <LayoutContext.Provider value={{ layout, setLayout }} >
      {children}
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
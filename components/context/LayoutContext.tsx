"use client"
import  { createContext, useState, ReactNode, useEffect, useContext } from 'react';



interface Layout {
  focusMode: false
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

  const [layout, setLayout] = useState<Layout>({focusMode:false})


  
  return (
    <LayoutContext.Provider value={{ layout, setLayout }} >
      {children}
    </LayoutContext.Provider>
  );
};


const SetLayout = (_key:string, _value:boolean)=>{
   const {layout,setLayout} = useContext(LayoutContext)

   useEffect(()=>{
    setLayout( (prevLayout) =>{
      const _layout = {...prevLayout};
      _layout[_value] = _key;
      return _layout;
    })
   },[])

   return null;
}
export { LayoutContext, LayoutProvider , SetLayout };
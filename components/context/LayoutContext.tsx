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

  const [layout, setLayout] = useState<Layout>({})


  const updateLayout = (_value:String, _key:Boolean )=>{
    setLayout( (prevLayout) =>{
      const _layout = {...prevLayout};
      _layout[_value] = _key;
      console.log( _layout )
      return _layout;
    })
  }
  
  return (
    <LayoutContext.Provider value={{ layout, updateLayout }} >
      {children}
    </LayoutContext.Provider>
  );
};


const SetLayout = (_key, _value)=>{
   const {layout,updateLayout} = useContext(LayoutContext)

   useEffect(()=>{
    updateLayout('focusMode',true)
   },[])

   return null;
}
export { LayoutContext, LayoutProvider , SetLayout };
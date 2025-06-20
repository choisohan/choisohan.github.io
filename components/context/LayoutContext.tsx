"use client"
import  { createContext, useState, ReactNode, useEffect, useContext } from 'react';

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

  const [layout, setLayout] = useState<Layout>({focusMode:false, lightbox: null })


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
    setLayout( { focusMode : true , lightbox:null  })
   },[])

   return null;
}
export { LayoutContext, LayoutProvider , LayoutComponent };
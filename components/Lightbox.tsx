
"use client";

// components/ZoomableImage.tsx
import { ReactNode, useState, useContext } from "react";
import { LayoutContext } from "./context/LayoutContext";

type Props = {
  src?: string;
  alt?: string;
};

function ZoomableImage({ src, alt }: Props) {
 const {layout,setLayout} = useContext(LayoutContext);



  const onClick =()=>{
    setLayout({...layout, lightbox:<img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          />});
  }
  if (!src) return ;

  return <img
        src={src}
        alt={alt}
        onClick={onClick}
        className="cursor-zoom-in max-w-full h-auto"
      />}



function ZoomableVideo({ children }: { children: ReactNode }) {
   const {layout,setLayout} = useContext(LayoutContext);

  let src: string | undefined;
  // Find <source src="..." /> among children
  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach((child) => {
    if (
      typeof child === "object" &&
      child !== null &&
      "type" in child &&
      child.type === "source" &&
      "props" in child
    ) {
      src = child.props.src;
    }
  });


  const onClick =()=>{
    setLayout({...layout,
      lightbox:
              <video
            controls
            autoPlay
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          >
            <source src={src} type="video/mp4" />
          </video>
    });
  }


  if (!src) return null;

  /*
        {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <video
            controls
            autoPlay
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
  */
  return <video
        controls autoPlay muted loop
        onClick={onClick}
        className="cursor-zoom-in max-w-full h-auto block" 
      >
        <source src={src} type="video/mp4" />
    </video>




}
export { ZoomableImage , ZoomableVideo }
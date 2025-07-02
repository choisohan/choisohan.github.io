
"use client";

// components/ZoomableImage.tsx
import { ReactNode, useContext ,  isValidElement, ReactElement   } from "react";
import { LayoutContext } from "./context/LayoutContext";

import type { VideoHTMLAttributes } from "react";


type Props = {
  src?: string;
  alt?: string;
  className?: string;

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




export default function ZoomableVideo(
  props: VideoHTMLAttributes<HTMLVideoElement> & { children?: ReactNode }
) {
  const { layout, setLayout } = useContext(LayoutContext);
  const { children, className, ...rest } = props;

  let src: string | undefined;

  // Support both <video src=""> and <video><source src="" /></video>
  if ('src' in props && props.src) {
    src = props.src;
  } else if (children) {
    const childArray = Array.isArray(children) ? children : [children];
    for (const child of childArray) {
      if (
        isValidElement(child) &&
        child.type === 'source' &&
        'src' in child.props
      ) {
        src = child.props.src;
        break;
      }
    }
  }

  if (!src) return null;

  const onClick = () => {
    setLayout({
      ...layout,
      lightbox: (
        <video
          controls
          autoPlay
          className="max-w-full max-h-full object-contain cursor-zoom-out"
        >
          <source src={src} type="video/mp4" />
        </video>
      ),
    });
  };

  return (
    <video
      {...rest}
      onClick={onClick}
      className={`cursor-zoom-in max-w-full h-auto block ${className ?? ""}`}
    >
      {children}
    </video>
  );
}
export { ZoomableImage , ZoomableVideo }
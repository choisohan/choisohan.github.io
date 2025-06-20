
"use client";

// components/ZoomableImage.tsx
import { ReactNode, useState, ReactElement } from "react";

type Props = {
  src?: string;
  alt?: string;
};

function ZoomableImage({ src, alt }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return ;

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in max-w-full h-auto"
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 h-screen w-screen"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}



function ZoomableVideo({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
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

  if (!src) return null;

  return (
    <>
      <video
        controls
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in max-w-full h-auto block"
        style={{ maxHeight: "400px" }}
      >
        <source src={src} type="video/mp4" />
      </video>

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
    </>
  );


}
export { ZoomableImage , ZoomableVideo }


import "./globals.css";
import YearlyGridPreview from "@/components/Theme_TwoBlocks/YearlyGridPreview";
import { Footer, SiteName   } from "@/components/Theme_TwoBlocks/ClientComponents";
import { Suspense } from "react";
import { LayoutProvider } from "@/components/context/LayoutContext";
import DynamicStyle from "@/components/Theme_TwoBlocks/DynamicStyle";


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (

      <html lang="en">
        <body>
          <LayoutProvider>

            <Suspense><DynamicStyle /></Suspense>
            <div className="contentBody [body[focus=true]_&]:!translate-x-0  w-full max-w-[850px] px-[40px] mt-[100px] mb-[20px] transition-all duration-200 translate-x-[500px] [body[focus=true]_&]:align-self-center [body[focus=true]_&]:justify-self-center">
              {children}
              </div>




            <div className="sideBar flex flex-col m-5 select-none static !md:static [body[focus=true]_&]:invisible">



              <span className="items-center justify-center self-center  mb-5">
                <SiteName />
              <p />
              </span>

              <span className="items-center  justify-center self-center [body[type=blog]_&]:w-full   mb-5">

              </span>


              
              <YearlyGridPreview className='yearlyGridPreview ' />
            </div>


              <Footer />


          </LayoutProvider>

        </body>

      </html>

  );
}

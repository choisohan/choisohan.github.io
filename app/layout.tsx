

import "./globals.css";
import YearlyGridPreview from "@/components/Theme_TwoBlocks/YearlyGridPreview";
import { ToggleButton ,DynamicStyle } from "@/components/Theme_TwoBlocks/ClientComponents";
import Link from "next/link";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (

      <html lang="en">
        <body>
          <DynamicStyle />

          <div className="menu flex flex-col m-5 pointer-events-none">
            <Link href='/' className="text-8xl font-serif font-extrabold pointer-events-auto">ChoiSohan</Link>
            <YearlyGridPreview className='open-target yearlyGridPreview pointer-events-auto' />
          </div>
          <ToggleButton className='open-menu-button fixed top-2 right-2 hover-scale '>Focus Mode</ToggleButton>
          <div className="contentBody">{children}</div>
        </body>

      </html>

  );
}



import "./globals.css";
import YearlyGridPreview from "@/components/Theme_TwoBlocks/YearlyGridPreview";
import { ToggleButton ,DynamicStyle, Footer } from "@/components/Theme_TwoBlocks/ClientComponents";
import Link from "next/link";
import { Suspense } from "react";
import { LayoutProvider } from "@/components/context/LayoutContext";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (

      <html lang="en">
        <body>
          <LayoutProvider>

            <Suspense><DynamicStyle /></Suspense>
            <div className="contentBody">{children}</div>

            <div className="menu flex flex-col m-5 pointer-events-none">
              <Link href='/' className="site-title text-8xl font-serif font-extrabold pointer-events-auto">ChoiSohan</Link>
              <YearlyGridPreview className='open-target yearlyGridPreview pointer-events-auto' />
            </div>
            <ToggleButton className='open-menu-button fixed top-2 right-2 hover-scale '>Focus Mode</ToggleButton>
            <Footer />
          </LayoutProvider>

        </body>

      </html>

  );
}

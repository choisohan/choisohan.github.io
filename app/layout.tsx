

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

            <div className="menu flex flex-col m-5">
              <span>
              <Link href='/' className="site-title text-5xl font-serif font-extrabold">ChoiSohan </Link>
              <Suspense><ToggleButton /></Suspense>

              </span>
              <YearlyGridPreview className='open-target yearlyGridPreview ' />
            </div>
            <Footer />
          </LayoutProvider>

        </body>

      </html>

  );
}

import React from "react";
import Header from "../sections/Header";

const Layout = ({ children }) => {
   return (
      <>
         {/* <Header /> */}
         <main>{children}</main>
      </>
   );
};

export default Layout;

import React from "react";
import LogoIcon from "./icons/LogoIcon";
import LogoText from "./icons/LogoText";

const Logo = () => {
   return (
      <div className="app-logo">
         <LogoIcon className="icon" />
         <LogoText className="text" />
      </div>
   );
};

export default Logo;

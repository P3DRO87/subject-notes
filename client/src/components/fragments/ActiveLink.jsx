import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ActiveLink = ({ children, href, activeClass = "", className = "", ...rest }) => {
   const { pathname } = useRouter();

   const activeClassStr = `${
      pathname === href ? `${className ? ` ${activeClass}` : `${activeClass}`}` : ""
   }`;

   return (
      <Link href={href} className={`${className}${activeClassStr}`} {...rest}>
         {children}
      </Link>
   );
};

export default ActiveLink;

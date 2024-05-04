import React, { useEffect } from "react";

const Toast = ({
   isToastActive = false,
   hideTime = 4000,
   children,
   onToastHide = function () {},
   setIsToastActive = function () {},
}) => {
   useEffect(() => {
      let timeout;

      if (isToastActive) {
         timeout = setTimeout(() => {
            onToastHide();
            setIsToastActive(false);
         }, hideTime);
      }

      return () => clearTimeout(timeout);
   }, [isToastActive]);

   return <div className={`c-toast${isToastActive ? " active" : ""}`}>{children}</div>;
};

export default Toast;

import React from "react";

const BurgerBtn = ({ isActive, ...props }) => {
   return (
      <div {...props} className={`burger-btn${isActive ? " active" : ""}`}>
         <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               className="dot-top-right"
               cx="12"
               cy="4"
               r="2"
               fill="currentColor"
            ></circle>
            <circle
               className="dot-bottom-right"
               cx="12"
               cy="12"
               r="2"
               fill="currentColor"
            ></circle>
            <circle
               className="dot-top-left"
               cx="4"
               cy="4"
               r="2"
               fill="currentColor"
            ></circle>
            <circle
               className="dot-bottom-left"
               cx="4"
               cy="12"
               r="2"
               fill="currentColor"
            ></circle>
         </svg>
      </div>
   );
};

export default BurgerBtn;

import React from "react";

const Calendar = () => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className="h-4 w-4"
      >
         <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
         <line x1="16" x2="16" y1="2" y2="6"></line>
         <line x1="8" x2="8" y1="2" y2="6"></line>
         <line x1="3" x2="21" y1="10" y2="10"></line>
      </svg>
   );
};

export default Calendar;

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import TrashCan from "./icons/TrashCan";

const BlockMenuContext = ({
   id = NaN,
   isActive = false,
   triggerRef,
   setIsActive = function () {},
   itemLinkText = "",
   itemLink = "",
   onRename = function () {},
   onDelete = function () {},
}) => {
   const toolTipRef = useRef();

   useEffect(() => {
      const handleCloseTooltip = (e) => {
         if (toolTipRef.current && toolTipRef.current.contains(e.target)) return;

         if (
            !(e.target === triggerRef.current || triggerRef.current.contains(e.target))
         ) {
            setIsActive(false);
         }
      };

      document.addEventListener("click", handleCloseTooltip);
      return () => {
         document.removeEventListener("click", handleCloseTooltip);
      };
   }, []);

   return (
      <Tooltip
         isOpen={isActive}
         id={id}
         openOnClick
         place="bottom-start"
         noArrow
         className={`menu-context${!isActive ? " d-none" : ""}`}
      >
         <div ref={toolTipRef} className="item-options">
            <Link className="item-element" href={itemLink}>
               {itemLinkText}
            </Link>
            <button
               onClick={() => {
                  onRename();
                  setIsActive(false);
               }}
               className="item-element rename-btn"
            >
               Renombrar
            </button>
            <button onClick={onDelete} className="item-element btn-delete-note">
               <TrashCan /> Eliminar
            </button>
         </div>
      </Tooltip>
   );
};

export default BlockMenuContext;

import React from "react";
import { ActiveClassEl, TrasitionTrigger } from "../utils/TrasitionTrigger";
import Close from "./icons/Close";

const Modal = ({
   children,
   isModalActive = false,
   colSize = { xl: 6, lg: 6, md: 8, sm: 12, xs: 12 },
   onTrasitionEnd = function () {},
   onClose = function () {},
}) => {
   const { xl, lg, md, sm, xs } = colSize;

   const handleClose = ({ target, ...rest }) => {
      if (
         target.matches(".close-modal-btn") ||
         target.matches(".custom-modal") ||
         target.matches(".modal-row")
      ) {
         onClose({ target, ...rest });
      }
   };

   return (
      <TrasitionTrigger
         onTrasitionEnd={onTrasitionEnd}
         activeClass="active"
         trigger={isModalActive}
      >
         <ActiveClassEl onClick={handleClose} className={"custom-modal scroll-y-auto"}>
            <div className="container m-auto">
               <div className="row justify-content-center modal-row">
                  <div
                     className={`col-xl-$${xl} col-lg-${lg} col-md-${md} col-sm-${sm}, col-${xs}`}
                  >
                     <div className="custom-modal-content-wrap w-100">
                        <button
                           onClick={({ target, ...rest }) => onClose({ target, ...rest })}
                           className="close-modal-btn"
                        >
                           <Close />
                        </button>
                        <div className="custom-modal-content">{children}</div>
                     </div>
                  </div>
               </div>
            </div>
         </ActiveClassEl>
      </TrasitionTrigger>
   );
};

export default Modal;

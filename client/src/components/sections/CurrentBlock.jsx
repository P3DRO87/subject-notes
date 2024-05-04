import { setBlockHeaderHeight } from "@/redux/ui";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const CurrentBlock = ({
   children,
   blockTitle = "",
   buttonText = "",
   isBlockHeaderBtnDisable = false,
   onBtnHeaderClick = function () {},
}) => {
   const dispatch = useDispatch();

   const { blockHeaderHeight } = useSelector((state) => state.ui);

   const blockHeaderRef = useRef();

   useEffect(() => {
      const handleSetBlockHeaderHeight = () => {
         const { height } = blockHeaderRef.current.getBoundingClientRect();

         dispatch(setBlockHeaderHeight(height));
      };

      handleSetBlockHeaderHeight();

      window.addEventListener("resize", handleSetBlockHeaderHeight);

      return () => window.removeEventListener("resize", handleSetBlockHeaderHeight);
   }, []);

   return (
      <div className="current-block">
         <div
            ref={blockHeaderRef}
            className="block-header d-flex justify-content-between"
         >
            <h2 className="block-title">{blockTitle}</h2>
            {!isBlockHeaderBtnDisable && (
               <button onClick={onBtnHeaderClick} className="btn-primary font-weight-500">
                  {buttonText}
               </button>
            )}
         </div>
         <section
            style={{ maxHeight: `calc(100svh - ${blockHeaderHeight}px)` }}
            className="block-content"
         >
            {children}
         </section>
      </div>
   );
};

export default CurrentBlock;

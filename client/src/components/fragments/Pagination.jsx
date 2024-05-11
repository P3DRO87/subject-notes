import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const MAX_TO_OFFSET = 5;

const Pagination = ({
   paginationTotal = 15,
   initialPage = 1,
   onSelectedPage = function () {},
}) => {
   const paginationTotalArr = [...Array(paginationTotal).fill("").keys()].map(
      (_, i) => i + 1
   );

   const selectedItemRef = useRef();

   const [currentPageNumber, setCurrentPageNumber] = useState(initialPage);
   const [translateXIdx, setTranslateXIdx] = useState(initialPage % MAX_TO_OFFSET);
   const [selectedItemWidth, setSelectedItemWidth] = useState(null);

   const [paginationLimit, setPaginationLimit] = useState({
      offset: 0,
      limit: 5,
   });

   const paginatedArr = paginationTotalArr.slice(
      paginationLimit.offset,
      paginationLimit.limit
   );

   const handleChangePagination = (currentPage) => {
      setCurrentPageNumber(currentPage);
      setTranslateXIdx(currentPage % MAX_TO_OFFSET || MAX_TO_OFFSET);
   };

   useEffect(() => {
      const { width } = selectedItemRef.current.getBoundingClientRect();

      setSelectedItemWidth(width);
   }, []);

   useEffect(() => {
      onSelectedPage(currentPageNumber);
   }, [currentPageNumber]);

   return (
      <div className="wrapper">
         <div
            onClick={() => {
               let paginatedArr = [...paginationTotalArr];

               const newPaginaLimit = {
                  offset: paginationLimit.offset - MAX_TO_OFFSET,
                  limit: paginationLimit.limit - MAX_TO_OFFSET,
               };

               if (newPaginaLimit.offset < 0) return;

               setPaginationLimit(newPaginaLimit);

               paginatedArr = paginatedArr.slice(
                  newPaginaLimit.offset,
                  newPaginaLimit.limit
               );

               setCurrentPageNumber((prev) => {
                  const controlledOffset = prev % MAX_TO_OFFSET;

                  return paginatedArr[
                     controlledOffset === 0 ? MAX_TO_OFFSET - 1 : controlledOffset - 1
                  ];
               });
            }}
            className="next-page-btn pagination-item"
         >
            <MdKeyboardDoubleArrowRight style={{ rotate: "-180deg" }} />
         </div>
         <div className="pagination-group">
            <div
               style={{
                  transform: `translateX(${
                     (selectedItemWidth + 4) * (translateXIdx - 1)
                  }px)`,
               }}
               ref={selectedItemRef}
               className="selected-item"
            >
               {currentPageNumber}
            </div>
            {paginatedArr.map((n) => (
               <div
                  key={n}
                  onClick={() => handleChangePagination(n)}
                  className={`pagination-item`}
               >
                  {n}
               </div>
            ))}
         </div>
         <div
            onClick={() => {
               let paginatedArr = [...paginationTotalArr];

               const newPaginaLimit = {
                  offset: paginationLimit.offset + MAX_TO_OFFSET,
                  limit: paginationLimit.limit + MAX_TO_OFFSET,
               };

               if (newPaginaLimit.offset === paginationTotal) return;

               setPaginationLimit(newPaginaLimit);

               paginatedArr = paginatedArr.slice(
                  newPaginaLimit.offset,
                  newPaginaLimit.limit
               );

               setCurrentPageNumber((prev) => {
                  const controlledOffset = prev % MAX_TO_OFFSET;

                  return paginatedArr[
                     controlledOffset === 0 ? MAX_TO_OFFSET - 1 : controlledOffset - 1
                  ];
               });
            }}
            className="next-page-btn pagination-item"
         >
            <MdKeyboardDoubleArrowRight />
         </div>
      </div>
   );
};

export default Pagination;

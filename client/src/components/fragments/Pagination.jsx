import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const MAX_TO_OFFSET = 5;

const initialPaginaLimit = { offset: 0, limit: 5 };

const Pagination = ({ paginationTotal = 25, initialPage = 1 }) => {
   const paginationTotalArr = [...Array(paginationTotal).fill("").keys()].map(
      (_, i) => i + 1
   );

   const selectedItemRef = useRef();

   const [currentPageNumber, setCurrentPageNumber] = useState(initialPage);
   const [translateXIdx, setTranslateXIdx] = useState(initialPage);
   const [selectedItemWidth, setSelectedItemWidth] = useState(null);
   const [paginationLimit, setPaginationLimit] = useState(initialPaginaLimit);

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

   return (
      <div className="wrapper">
         <div className="next-page-btn pagination-item">
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

               setPaginationLimit((prev) => {
                  const newState = {
                     ...prev,
                     offset: prev.offset + MAX_TO_OFFSET,
                     limit: prev.limit + MAX_TO_OFFSET,
                  };

                  paginatedArr = paginatedArr.slice(newState.offset, newState.limit);

                  console.log(paginatedArr[(currentPageNumber % MAX_TO_OFFSET) - 1]);

                  setCurrentPageNumber(
                     (prev) => paginatedArr[(prev % MAX_TO_OFFSET) - 1]
                  );

                  return newState;
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

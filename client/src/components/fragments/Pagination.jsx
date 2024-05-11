import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { RxDotsHorizontal } from "react-icons/rx";

const initialOffsetCount = { prev: 2, next: 5 };

const MAX_TO_OFFSET = 5;
const OFFSET_BETWEEN = 3;

const Pagination = ({ paginationTotal = 10, initialPage = 1 }) => {
   const paginationTotalArr = [...Array(paginationTotal).fill("").keys()].map(
      (_, i) => i + 1
   );

   const selectedItemRef = useRef();

   const [currentPageNumber, setCurrentPageNumber] = useState(initialPage);
   const [translateXIdx, setTranslateXIdx] = useState(initialPage);
   const [selectedItemWidth, setSelectedItemWidth] = useState(null);
   const [offsetCount, setOffsetCount] = useState(initialOffsetCount);

   const isTotalOfssetLimit = paginationTotal - currentPageNumber <= OFFSET_BETWEEN;

   const handleChangePagination = (currentPage) => {
      console.log(currentPage);
      const isGoingRight = currentPage > currentPageNumber;

      const isOffsetLimit = currentPage >= MAX_TO_OFFSET;

      const isTotalOfssetLimit = paginationTotal - currentPageNumber <= OFFSET_BETWEEN;

      if (!isTotalOfssetLimit && isGoingRight && isOffsetLimit) {
         setOffsetCount({ prev: offsetCount.prev + 1, next: offsetCount.next + 1 });
      }

      if (!isTotalOfssetLimit && !isGoingRight && currentPage + 1 >= MAX_TO_OFFSET) {
         setOffsetCount({ prev: offsetCount.prev - 1, next: offsetCount.next - 1 });
      }

      if (isGoingRight && isTotalOfssetLimit) {
         setTranslateXIdx(currentPage - OFFSET_BETWEEN);
         return setCurrentPageNumber(currentPage);
      }

      setTranslateXIdx(currentPage >= MAX_TO_OFFSET ? MAX_TO_OFFSET - 1 : currentPage);
      setCurrentPageNumber(currentPage);
   };

   useEffect(() => {
      const { width } = selectedItemRef.current.getBoundingClientRect();

      setSelectedItemWidth(width);
   }, []);

   return (
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
         <div
            onClick={() => {
               setTranslateXIdx(1);
               setCurrentPageNumber(1);
               setOffsetCount(initialOffsetCount);
            }}
            className="first-item pagination-item"
         >
            1
         </div>
         <div
            onClick={() => {
               if (currentPageNumber < MAX_TO_OFFSET) return handleChangePagination(2);

               const leftLimit = offsetCount.prev - MAX_TO_OFFSET;
               const rightLimit = offsetCount.next - MAX_TO_OFFSET;

               const nextOffset = { prev: leftLimit, next: rightLimit };
               handleChangePagination(currentPageNumber - MAX_TO_OFFSET || 1);
               setOffsetCount(leftLimit <= 1 ? initialOffsetCount : nextOffset);
            }}
            className="next-page-btn pagination-item"
         >
            {currentPageNumber >= MAX_TO_OFFSET ? <RxDotsHorizontal /> : 2}
         </div>
         {paginationTotalArr.slice(offsetCount.prev, offsetCount.next).map((n) => (
            <div
               key={n}
               onClick={() => handleChangePagination(n)}
               className={`pagination-item`}
            >
               {n}
            </div>
         ))}
         <div
            onClick={() => {
               if (currentPageNumber + 1 >= MAX_TO_OFFSET + OFFSET_BETWEEN - 1) {
                  setTranslateXIdx(MAX_TO_OFFSET + OFFSET_BETWEEN - 1);
                  return setCurrentPageNumber(paginationTotal);
               }

               const leftLimit = offsetCount.prev + MAX_TO_OFFSET - OFFSET_BETWEEN;
               const rightLimit = offsetCount.next + MAX_TO_OFFSET - OFFSET_BETWEEN;

               const nextOffset = { prev: leftLimit, next: rightLimit };
               handleChangePagination(
                  currentPageNumber + OFFSET_BETWEEN >= MAX_TO_OFFSET
                     ? 7
                     : currentPageNumber + OFFSET_BETWEEN
               );
               setOffsetCount(nextOffset);

               currentPageNumber + 1 < MAX_TO_OFFSET + OFFSET_BETWEEN - 1 &&
                  setCurrentPageNumber(currentPageNumber + MAX_TO_OFFSET);
            }}
            className="next-page-btn pagination-item"
         >
            {!isTotalOfssetLimit ? <RxDotsHorizontal /> : paginationTotal - 1}
         </div>
         <div className="last-item pagination-item">{paginationTotal}</div>
      </div>
   );
};

export default Pagination;

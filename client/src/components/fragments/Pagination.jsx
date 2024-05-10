import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { RxDotsHorizontal } from "react-icons/rx";

const initialOffsetCount = { prev: 2, next: 5 };

const MAX_TO_OFFSET = 5;

const Pagination = ({ paginationTotal = 25, initialPage = 1 }) => {
   const paginationTotalArr = [...Array(paginationTotal).fill("").keys()].map(
      (_, i) => i + 1
   );

   const selectedItemRef = useRef();

   const [currentPageNumber, setCurrentPageNumber] = useState(initialPage);
   const [translateXIdx, setTranslateXIdx] = useState(initialPage);
   const [selectedItemWidth, setSelectedItemWidth] = useState(null);
   const [offsetCount, setOffsetCount] = useState(initialOffsetCount);

   const handleChangePagination = (currentPage) => {
      const isGoingRight = currentPage > currentPageNumber;

      const isOffsetLimit = currentPage >= MAX_TO_OFFSET;

      if (isGoingRight && isOffsetLimit) {
         setOffsetCount({ prev: offsetCount.prev + 1, next: offsetCount.next + 1 });
      }

      if (!isGoingRight && currentPage + 1 >= MAX_TO_OFFSET) {
         setOffsetCount({ prev: offsetCount.prev - 1, next: offsetCount.next - 1 });
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
            onClick={() => handleChangePagination(1)}
            className="first-item pagination-item"
         >
            1
         </div>
         <div
            onClick={() => {
               if (currentPageNumber < MAX_TO_OFFSET) return handleChangePagination(2);

               const offsetBetween = offsetCount.next - offsetCount.prev;

               const leftLimit = offsetCount.prev - offsetBetween;
               const rightLimit = offsetCount.next - offsetBetween;

               const nextOffset = { prev: leftLimit, next: rightLimit };
               console.log(offsetBetween);
               handleChangePagination(leftLimit <= 1 ? 1 : offsetBetween - 1);
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
         <div className="next-page-btn pagination-item">
            <RxDotsHorizontal />
         </div>
         <div className="last-item pagination-item">{paginationTotal}</div>
      </div>
   );
};

export default Pagination;

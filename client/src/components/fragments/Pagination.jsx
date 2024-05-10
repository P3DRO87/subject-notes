import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { RxDotsHorizontal } from "react-icons/rx";

const initialOffsetCount = { prev: 2, next: 5 };

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
      setTranslateXIdx(currentPage >= 5 ? 4 : currentPage);

      const isOffsetLimit = currentPage >= 5;

      if (isOffsetLimit) {
         setOffsetCount((prevState) => ({
            ...prevState,
            prev: prevState.prev + 1,
            next: prevState.next + 1,
         }));
      }

      if (!isOffsetLimit && offsetCount.prev - 1 >= 2) {
         setOffsetCount((prevState) => ({
            ...prevState,
            prev: prevState.prev - 1,
            next: prevState.next - 1,
         }));
      }

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
               handleChangePagination(2);
               setOffsetCount(initialOffsetCount);
            }}
            className="next-page-btn pagination-item"
         >
            {currentPageNumber >= 5 ? <RxDotsHorizontal /> : 2}
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

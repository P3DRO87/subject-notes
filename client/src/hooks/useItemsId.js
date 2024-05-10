import { useEffect, useState } from "react";

const useItemsId = (arr) => {
   const [data, setData] = useState(arr);

   useEffect(() => {
      function* generateId() {
         while (true) {
            yield Date.now().toString(32);
         }
      }

      setData((prev) => prev.map((item) => ({ ...item, id: generateId().next().value })));
   }, []);

   return data;
};

export default useItemsId;

const initialState = {
   blockHeaderHeight: 45.8,
   isToastActive: false,
   toastMsg: "",
};

export const uiReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_BLOCK_HEADER_HEIGHT":
         return { ...state, blockHeaderHeight: payload };

      case "SET_IS_TOAST_ACTIVE":
         return { ...state, isToastActive: payload };

      case "SET_TOAST_MSG":
         return { ...state, toastMsg: payload };

      default:
         return state;
   }
};

export const setIsToastActive = (isToastActive) => ({
   type: "SET_IS_TOAST_ACTIVE",
   payload: isToastActive,
});

export const setBlockHeaderHeight = (blockHeaderHeight) => ({
   type: "SET_BLOCK_HEADER_HEIGHT",
   payload: blockHeaderHeight,
});

export const setToastMsg = (msg) => ({ type: "SET_TOAST_MSG", payload: msg });

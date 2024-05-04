const initialState = {
   files: [],
};

export const filesReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "Hola":
         return { ...state, ...payload };

      default:
         return state;
   }
};

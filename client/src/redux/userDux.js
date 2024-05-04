const initialState = {
   user: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_USER":
         return { ...state, user: payload };

      default:
         return state;
   }
};

export const setUser = (user) => ({ type: "SET_USER", payload: user });

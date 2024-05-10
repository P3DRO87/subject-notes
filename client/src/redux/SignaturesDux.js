const initialState = {
   signatures: [],
};

export const signatureReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_SIGNATURES": {
         return { ...state, signatures: payload };
      }

      case "ADD_NEW_SIGNATURE":
         return {
            ...state,
            signatures: [...state.signatures, { name: payload, id: Date.now() }],
         };

      case "DELETE_SIGNATURE":
         return {
            ...state,
            signatures: state.signatures.filter((signature) => signature.id !== payload),
         };

      case "EDIT_SIGNATURE_NAME":
         return {
            ...state,
            signatures: state.signatures.map((signature) =>
               signature.id === payload.id ? payload : signature
            ),
         };

      default:
         return state;
   }
};

export const setSignatures = (signatures) => ({
   type: "SET_SIGNATURES",
   payload: signatures,
});

export const addNewSignature = (newSignature) => ({
   type: "ADD_NEW_SIGNATURE",
   payload: newSignature,
});

export const deleteSignature = (id) => ({ type: "DELETE_SIGNATURE", payload: id });

export const editSignatureName = (signature) => ({
   type: "EDIT_SIGNATURE_NAME",
   payload: signature,
});

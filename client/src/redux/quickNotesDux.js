export const initialNote = {
   id: "1",
   title: "Mi primera Nota",
   description: "Este es un ejemplo. Puedes editar una nota haciendo click sobre ella",
   content:
      "Contenido de ejemplo: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam iure cumque quisquam adipisci, et alias dolorum eveniet laboriosam facilis consequatur, recusandae aspernatur neque repudiandae, praesentium ea impedit? Animi, fugit placeat?",
};

const initialState = {
   quickNotes: [initialNote],

   selectedNote: null,
};

export const quickNotesReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "SET_NOTES":
         return { ...state, quickNotes: payload };

      case "ADD_NEW_NOTE":
         return { ...state, quickNotes: [...state.quickNotes, payload] };

      case "DELETE_NOTE":
         return {
            ...state,
            quickNotes: state.quickNotes.filter((note) => note.id !== payload),
         };

      case "EDIT_NOTE":
         return {
            ...state,
            quickNotes: state.quickNotes.map((note) =>
               note.id === payload.id ? payload : note
            ),
         };

      case "SET_SELECTED_NOTE":
         return { ...state, selectedNote: payload };

      default:
         return state;
   }
};

export const setNotes = (notes) => ({ type: "SET_NOTES", payload: notes });

export const addNewNote = (newNote) => ({ type: "ADD_NEW_NOTE", payload: newNote });

export const deleteNote = (id) => ({ type: "DELETE_NOTE", payload: id });

export const editNote = (note) => ({ type: "EDIT_NOTE", payload: note });

export const setSelectedNote = (selectedNote) => ({
   type: "SET_SELECTED_NOTE",
   payload: selectedNote,
});

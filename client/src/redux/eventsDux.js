const startDate = new Date();
startDate.setHours(startDate.getHours() + 2);

const endDate = new Date();
endDate.setDate(startDate.getDate() + 3);

export const exampleEvent = {
   title: "Nuevo evento",
   description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
   category: "Eventos",
   start: startDate,
   end: endDate,
   id: Date.now(),
};

const initialState = {
   events: [exampleEvent],
};

export const eventsReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "ADD_NEW_EVENT":
         return { ...state, events: [...state.events, payload] };

      case "EDIT_EVENT":
         return {
            ...state,
            events: state.events.map((event) =>
               event.id === payload.id ? payload : event
            ),
         };

      case "DELETE_EVENT":
         return {
            ...state,
            events: state.events.filter((event) => event.id !== payload),
         };

      default:
         return state;
   }
};

export const addNewEvent = (newEvent) => ({ type: "ADD_NEW_EVENT", payload: newEvent });

export const editEvent = (event) => ({ type: "EDIT_EVENT", payload: event });

export const deleteEvent = (id) => ({ type: "DELETE_EVENT", payload: id });

const initialState = {
   tasks: [],
};

export const tasksReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case "ADD_NEW_TASK":
         return {
            ...state,
            tasks: [...state.tasks, { name: payload, id: Date.now() }],
         };

      case "DELETE_TASK":
         return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== payload),
         };

      case "EDIT_TASK":
         return {
            ...state,
            tasks: state.tasks.map((task) => (task.id === payload.id ? payload : task)),
         };

      default:
         return state;
   }
};

export const addNewTask = (newTask) => ({
   type: "ADD_NEW_TASK",
   payload: newTask,
});

export const deleteTask = (id) => ({ type: "DELETE_TASK", payload: id });

export const editTask = (task) => ({
   type: "EDIT_TASK",
   payload: task,
});

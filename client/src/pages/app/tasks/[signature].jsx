import Input from "@/components/fragments/Input";
import Modal from "@/components/fragments/Modal";
import TaskItem from "@/components/fragments/TaskItem";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import { addNewTask } from "@/redux/tasksDux";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const TasksListPage = () => {
   const dispatch = useDispatch();

   const { tasks } = useSelector((state) => state.tasks);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const [isTaskModalActive, setIsTaskModalActive] = useState(false);
   const [newTask, setNewTask] = useState(null);

   const handleSetTask = (newNoteData) => {
      setIsTaskModalActive(false);
      setNewTask(newNoteData);
   };

   const handleAddNewTask = () => {
      if (!newTask) return;

      dispatch(addNewTask(newTask.title));
      setNewTask(null);
      reset();
   };

   return (
      <>
         <Modal
            onTrasitionEnd={handleAddNewTask}
            onClose={() => setIsTaskModalActive(false)}
            isModalActive={isTaskModalActive}
         >
            <form onSubmit={handleSubmit(handleSetTask)} className="new-note-form">
               <h2 className="new-note-title mb-4">Crea tu nueva tarea</h2>
               <Input
                  label="Titulo"
                  placeholder="Requerido"
                  {...register("title", {
                     required: "El titulo es requrido",
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
               />
               <div className="d-flex justify-content-center">
                  <button className="btn-primary btn-create-note text-center">
                     Crear nota
                  </button>
               </div>
            </form>
         </Modal>
         <LoggedInLayout
            buttonText="Nueva tarea"
            pageTitle="Lista de tareas"
            blockTitle="Lista de tareas"
            onBtnHeaderClick={() => setIsTaskModalActive(true)}
         >
            <div className="tasks-list-page">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-8 mt-5">
                        <div className="block-item muted mb-3">
                           <h3 className="title">
                              Lista de tareas de: {"Current signature"}
                           </h3>
                           <p className="description">
                              Puedes añadir las tareas que necesites
                           </p>
                        </div>
                        {tasks.map((task) => (
                           <TaskItem key={task.id} task={task} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </LoggedInLayout>
      </>
   );
};

export default TasksListPage;

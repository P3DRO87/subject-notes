import Input from "@/components/fragments/Input";
import Modal from "@/components/fragments/Modal";
import QuickNoteItem from "@/components/fragments/QuickNoteItem";
import Textarea from "@/components/fragments/Textarea";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import { addNewNoteDB, getNotes } from "@/helpers/quick-notes";
import { addNewNote, setNotes } from "@/redux/quickNotesDux";
import { setIsToastActive, setToastMsg } from "@/redux/ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const QuickNotes = ({ quickNotes: quickNotesDB }) => {
   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const { quickNotes } = useSelector((state) => state.quickNotes);

   const [isNoteModalActive, setIsNoteModalActive] = useState(false);
   const [newNote, setNewNote] = useState(null);

   const handleOpenNoteModal = () => {
      setIsNoteModalActive(true);
   };

   const handleSetNote = (newNoteData) => {
      setIsNoteModalActive(false);
      setNewNote(newNoteData);
   };

   const handleAddNewNote = async () => {
      if (!newNote) return;

      const token = localStorage.getItem("token");

      const [newNoteRes, err] = await addNewNoteDB({ ...newNote, token });

      if (err) {
         dispatch(
            setToastMsg(
               <p className="text-danger font-weight-600">Fallo al agregar nota</p>
            )
         );
         return dispatch(setIsToastActive(true));
      }

      dispatch(addNewNote(newNoteRes.newNote));
      setNewNote(null);
      reset();
   };

   useEffect(() => {
      dispatch(setNotes(quickNotesDB));
   }, [dispatch, quickNotesDB]);

   return (
      <>
         <Modal
            onTrasitionEnd={handleAddNewNote}
            onClose={() => setIsNoteModalActive(false)}
            isModalActive={isNoteModalActive}
         >
            <form onSubmit={handleSubmit(handleSetNote)} className="new-note-form">
               <h2 className="new-note-title mb-4">Crea tu nueva nota rapida</h2>
               <Input
                  label="Titulo"
                  placeholder="Requerido"
                  {...register("title", {
                     required: "El titulo es requrido",
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
               />
               <Input
                  {...register("description")}
                  label="Descripcion"
                  placeholder="Opcional"
               />
               <Textarea
                  label="Contenido"
                  placeholder="Requerido"
                  {...register("content", {
                     required: "El Contenido es requrido",
                  })}
                  error={!!errors.content}
                  helperText={errors.content?.message}
               />
               <div className="d-flex justify-content-center">
                  <button className="btn-primary btn-create-note text-center">
                     Crear nota
                  </button>
               </div>
            </form>
         </Modal>
         <LoggedInLayout
            buttonText="Nueva nota"
            pageTitle="Notas rapidas"
            blockTitle="Notas rapidas"
            onBtnHeaderClick={handleOpenNoteModal}
         >
            <div className="quick-notes-page">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-8">
                        <div className="quick-notes mt-5">
                           <div className="block-item quick-note-item muted mb-3">
                              <h3 className="title">Bienvenido a tus Notas</h3>
                              <p className="description">
                                 haz click en "Nueva nota" para empezar. O bien puedes
                                 seleccionar otras opciones en la barra lateral izquierda
                              </p>
                           </div>
                           {quickNotes.map((quickNote) => (
                              <QuickNoteItem key={quickNote.id} quickNote={quickNote} />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </LoggedInLayout>
      </>
   );
};

export default QuickNotes;

export const getServerSideProps = async ({ req }) => {
   const token = req?.cookies["token"];

   const [quickNotesRes, error] = await getNotes({ token });

   return {
      props: {
         quickNotes: quickNotesRes?.quickNotes || [],
      },
   };
};

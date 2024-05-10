import Input from "@/components/fragments/Input";
import Modal from "@/components/fragments/Modal";
import Textarea from "@/components/fragments/Textarea";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import { getNote, updateNoteDB } from "@/helpers/quick-notes";
import { editNote } from "@/redux/quickNotesDux";
import { setIsToastActive, setToastMsg } from "@/redux/ui";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const getFormatedDate = (date) => {
   date = new Date(date);

   const day = date.getDate().toString();

   const month = (date.getMonth() + 1).toString();

   const year = date.getFullYear();

   return `${`0${day}`.slice(-2)}/${`0${month}`.slice(-2)}/${year}`;
};

const SingleQuickNote = ({ note }) => {
   const dispatch = useDispatch();

   const [noteToRender, setNoteToRender] = useState(note);

   const {
      register,
      setValue,
      getValues,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: noteToRender });

   const [isNoteModalActive, setIsNoteModalActive] = useState(false);

   const handleOpenNoteModal = () => {
      Object.entries(noteToRender).forEach(([key, value]) => {
         setValue(key, value, { shouldValidate: true });
      });

      setIsNoteModalActive(true);
   };

   const handleSetNote = (noteData) => {
      Object.entries(noteData).forEach(([key, value]) => {
         setValue(key, value, { shouldValidate: true });
      });

      setIsNoteModalActive(false);
   };
   const handleAddNewNote = async () => {
      const token = localStorage.getItem("token");

      const [updatedNoteRes, err] = await updateNoteDB({ ...getValues(), token });

      if (err) {
         dispatch(
            setToastMsg(
               <p className="text-danger font-weight-600">Fallo al editar la nota</p>
            )
         );
         return dispatch(setIsToastActive(true));
      }

      dispatch(editNote(updatedNoteRes.updatedNote));
      setNoteToRender(updatedNoteRes.updatedNote);
      reset();
   };

   return (
      <>
         <Modal
            onTrasitionEnd={handleAddNewNote}
            onClose={() => setIsNoteModalActive(false)}
            isModalActive={isNoteModalActive}
         >
            <form onSubmit={handleSubmit(handleSetNote)} className="new-note-form">
               <h2 className="new-note-title mb-4">Edita tu nota rapida</h2>
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
                     Editar nota
                  </button>
               </div>
            </form>
         </Modal>
         <LoggedInLayout
            buttonText="Editar nota"
            pageTitle="Notas rapidas"
            blockTitle="Notas rapidas"
            onBtnHeaderClick={handleOpenNoteModal}
         >
            <div className="quick-note-page h-100 position-relative d-flex flex-column">
               <div className="container h-100">
                  <div className="row justify-content-center h-100">
                     <div className="col-lg-7 h-100">
                        <div className="quick-note-block-item position-relative h-100">
                           <div className="content w-100">
                              <h2 className="text-center justify-content-center d-flex align-items-center gap-2">
                                 <span>{noteToRender.title}</span>

                                 <span className="font-muted fs-6 mt-auto">
                                    {getFormatedDate(noteToRender.createdAt)}
                                 </span>
                              </h2>
                              <p className="mt-4">{noteToRender.content}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pagination-container"></div>
            </div>
         </LoggedInLayout>
      </>
   );
};

export default SingleQuickNote;

export const getServerSideProps = async ({ params, req }) => {
   const { id } = params;
   const token = req?.cookies["token"];

   const [noteRes] = await getNote({ id, token });

   if (!noteRes) return { notFound: true };

   return {
      props: {
         note: noteRes.note,
      },
   };
};

import BlockMenuContext from "@/components/fragments/BlockMenuContext";
import Input from "@/components/fragments/Input";
import Modal from "@/components/fragments/Modal";
import SignatureItem from "@/components/fragments/SignatureItem";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import { getAllSignatures } from "@/helpers/signatures-db";
import { addNewSignature, setSignatures } from "@/redux/SignaturesDux";
import { setIsToastActive, setToastMsg } from "@/redux/ui";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const Signatures = () => {
   const dispatch = useDispatch();

   const { signatures } = useSelector((state) => state.signatures);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const [isSignatureModalActive, setIsSignatureModalActive] = useState(false);
   const [signatureName, setSignatureName] = useState(null);

   const handleSetSignatureName = ({ name }) => {
      setSignatureName(name);
      setIsSignatureModalActive(false);
   };

   const handleAddNewSignature = () => {
      if (!signatureName) return;

      dispatch(addNewSignature(signatureName));
      setSignatureName(null);
      reset();
   };

   useEffect(() => {
      const fetchSignatures = async () => {
         const token = localStorage.getItem("token");

         const [signaturesRes] = await getAllSignatures(token);

         if (!signaturesRes) {
            dispatch(setIsToastActive(true));
            return dispatch(setToastMsg("Fallo al cargar las asignaturas"));
         }

         dispatch(setSignatures(signaturesRes.signatures));
      };

      fetchSignatures();
   }, [dispatch]);

   return (
      <>
         <Modal
            onTrasitionEnd={handleAddNewSignature}
            onClose={() => setIsSignatureModalActive(false)}
            isModalActive={isSignatureModalActive}
         >
            <form
               autoComplete="off"
               onSubmit={handleSubmit(handleSetSignatureName)}
               className="new-note-form"
            >
               <h2 className="new-note-title mb-4">Crea tu nueva asignatura</h2>
               <Input
                  label="Nombre"
                  placeholder="Requerido"
                  {...register("name", {
                     required: "El nombre es requrido",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
               />
               <div className="d-flex justify-content-center">
                  <button className="btn-primary btn-create-note text-center">
                     Crear Asignatura
                  </button>
               </div>
            </form>
         </Modal>
         <LoggedInLayout
            buttonText="Nueva asignatura"
            pageTitle="Asignaturas"
            blockTitle="Asignaturas"
            onBtnHeaderClick={() => setIsSignatureModalActive(true)}
         >
            <div className="signatures-page page">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-8">
                        <div className="signatures-list mt-5 position-relative">
                           <div className="block-item signature-item muted mb-3">
                              <h3 className="title">
                                 Aqui se econtrara disponible la lista de tus asignaturas
                              </h3>
                              <p className="description">
                                 Haz click en "Nueva Asignatura" para empezar. Puedes
                                 iniciar anotando sobre tus asignaturas al hacer click
                                 sobre una de ellas, una vez creada
                              </p>
                           </div>
                           {signatures.map(({ id, name }) => (
                              <SignatureItem key={id} signature={{ id, name }} />
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

export default Signatures;

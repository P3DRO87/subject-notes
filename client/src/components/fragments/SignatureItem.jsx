import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { Tooltip } from "react-tooltip";
import TrashCan from "./icons/TrashCan";
import { useDispatch } from "react-redux";
import { deleteSignature, editSignatureName } from "@/redux/SignaturesDux";

const SignatureItem = ({ signature }) => {
   const dispatch = useDispatch();

   const [isToolTipActive, setIsToolTipActive] = useState(false);
   const [isRenaming, setIsRenaming] = useState(false);
   const [signatureName, setSignatureName] = useState(signature.name);

   const menuContextRef = useRef();
   const toolTipRef = useRef();
   const signatureNameInputRef = useRef();

   const toolTipId = signature.id;

   const handleOpenToolTip = (e) => {
      e.preventDefault();

      setIsToolTipActive((prev) => !prev);
   };

   const handleDeleteSignature = () => {
      dispatch(deleteSignature(signature.id));
   };

   const handleSaveNamedNote = ({ key }) => {
      if (key !== "Enter") return;

      dispatch(
         editSignatureName({
            ...signature,
            name: signatureName || signature.name,
         })
      );

      setIsRenaming(false);
   };

   useEffect(() => {
      const handleCloseTooltip = (e) => {
         if (toolTipRef.current && toolTipRef.current.contains(e.target)) return;

         if (
            !(
               e.target === menuContextRef.current ||
               menuContextRef.current.contains(e.target)
            )
         ) {
            setIsToolTipActive(false);
         }
      };

      document.addEventListener("click", handleCloseTooltip);
      return () => {
         document.removeEventListener("click", handleCloseTooltip);
      };
   }, []);

   useEffect(() => {
      if (!isRenaming || !signatureNameInputRef.current) return;

      signatureNameInputRef.current.focus();
   }, [isRenaming]);

   return (
      <>
         <Link
            href={`/app/signatures/${signature.id}`}
            key={signature}
            className="block-item signature-item d-flex justify-content-between align-items-center mb-3"
         >
            {!isRenaming && (
               <h3 contentEditable={isRenaming} className="title mb-0">
                  {signature.name}
               </h3>
            )}
            {isRenaming && (
               <input
                  onBlur={() => {
                     dispatch(
                        editSignatureName({
                           ...signature,
                           name: signatureName || signature.name,
                        })
                     );
                     !signatureName && setSignatureName(signature.name);
                     setIsRenaming(false);
                  }}
                  ref={signatureNameInputRef}
                  onKeyUp={handleSaveNamedNote}
                  onChange={({ target }) => setSignatureName(target.value)}
                  value={signatureName}
                  onClick={(e) => isRenaming && e.preventDefault()}
                  onFocus={(e) => isRenaming && e.preventDefault()}
                  className="rename-input"
                  type="text"
               />
            )}
            <button
               ref={menuContextRef}
               data-tooltip-id={toolTipId}
               onClick={handleOpenToolTip}
               className="btn-primary delete-btn"
            >
               <RxDotsHorizontal />
            </button>
         </Link>
         <Tooltip
            isOpen={isToolTipActive}
            id={toolTipId}
            openOnClick
            place="bottom-start"
            noArrow
            className={`menu-context${!isToolTipActive ? " d-none" : ""}`}
         >
            <div ref={toolTipRef} className="item-options">
               <Link className="item-element" href={`/signatures/${signature.name}`}>
                  Ir a la asignatura {signature.name}
               </Link>
               <button
                  onClick={() => {
                     setIsRenaming(true);
                     setIsToolTipActive(false);
                  }}
                  className="item-element rename-btn"
               >
                  Renombrar
               </button>
               <button
                  onClick={handleDeleteSignature}
                  className="item-element btn-delete-note"
               >
                  <TrashCan /> Eliminar
               </button>
            </div>
         </Tooltip>
      </>
   );
};

export default SignatureItem;

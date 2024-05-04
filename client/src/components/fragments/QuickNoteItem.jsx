import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import { Tooltip } from "react-tooltip";
import TrashCan from "./icons/TrashCan";
import { useDispatch } from "react-redux";
import { deleteNote, editNote, setSelectedNote } from "@/redux/quickNotesDux";
import { deleteNoteDB } from "@/helpers/quick-notes";
import { setIsToastActive } from "@/redux/ui";

const QuickNoteItem = ({ quickNote }) => {
   const dispatch = useDispatch();

   const toolTipId = quickNote.id;

   const [isToolTipActive, setIsToolTipActive] = useState(false);
   const [isRenaming, setIsRenaming] = useState(false);
   const [noteTitle, setNoteTitle] = useState(quickNote.title);

   const menuContextRef = useRef();
   const toolTipRef = useRef();
   const noteTitleInputRef = useRef();

   const handleOpenToolTip = (e) => {
      e.preventDefault();

      setIsToolTipActive((prev) => !prev);
   };

   const handleDeleteNote = async () => {
      const token = localStorage.getItem("token");

      const [deletedNoteRes, error] = await deleteNoteDB({ id: quickNote.id, token });

      if (!deletedNoteRes) {
         dispatch(
            setToastMsg(
               <p className="text-danger font-weight-600">Fallo al eliminar nota</p>
            )
         );
         return dispatch(setIsToastActive(true));
      }

      dispatch(deleteNote(quickNote.id));
   };

   const handleSaveNamedNote = async ({ key }) => {
      if (key !== "Enter") return;

      dispatch(editNote({ ...quickNote, title: noteTitle || quickNote.title }));
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
      if (!isRenaming || !noteTitleInputRef.current) return;

      noteTitleInputRef.current.focus();
   }, [isRenaming]);

   return (
      <>
         <Link
            onClick={(e) => {
               isToolTipActive && e.preventDefault();
               dispatch(setSelectedNote(quickNote));
            }}
            href={`/app/quick-notes/${quickNote.id}`}
            className="block-item quick-note-item mb-3 d-flex justify-content-between align-items-start"
         >
            <div className="content">
               {!isRenaming && (
                  <h3 contentEditable={isRenaming} className="title">
                     {quickNote.title}
                  </h3>
               )}
               {isRenaming && (
                  <input
                     onBlur={() => {
                        dispatch(
                           editNote({ ...quickNote, title: noteTitle || quickNote.title })
                        );
                        setIsRenaming(false);
                     }}
                     ref={noteTitleInputRef}
                     onKeyUp={handleSaveNamedNote}
                     onChange={({ target }) => setNoteTitle(target.value)}
                     value={noteTitle}
                     onClick={(e) => isRenaming && e.preventDefault()}
                     onFocus={(e) => isRenaming && e.preventDefault()}
                     className="rename-input"
                     type="text"
                  />
               )}
               <p className="description">{quickNote.description}</p>
            </div>
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
               <Link
                  onClick={() => dispatch(setSelectedNote(quickNote))}
                  className="item-element"
                  href={`/quick-notes/${quickNote.id}`}
               >
                  Ir a la nota
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
                  onClick={handleDeleteNote}
                  className="item-element btn-delete-note"
               >
                  <TrashCan /> Eliminar
               </button>
            </div>
         </Tooltip>
      </>
   );
};

export default QuickNoteItem;

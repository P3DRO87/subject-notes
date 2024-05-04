import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

import React from "react";

const BlockItem = ({ item, tooltip = true }) => {
   const [isToolTipActive, setIsToolTipActive] = useState(true);
   const [isRenaming, setIsRenaming] = useState(false);

   const handleOpenToolTip = (e) => {
      e.preventDefault();

      setIsToolTipActive((prev) => !prev);
   };

   const handleDeleteNote = () => {
      dispatch(deleteNote(quickNote.id));
   };

   const handleSaveNamedNote = ({ key }) => {
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
         <div className="block-item">
            <div className="content">
               {!isRenaming && (
                  <h3 contentEditable={isRenaming} className="title">
                     {item.title}
                  </h3>
               )}
               {isRenaming && (
                  <input
                     onBlur={() => {
                        setIsRenaming(false);
                     }}
                     // ref={noteTitleInputRef}
                     // onKeyUp={handleSaveNamedNote}
                     // onChange={({ target }) => setNoteTitle(target.value)}
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
            />
         </div>
         <Tooltip
            isOpen={isToolTipActive}
            id={item.id}
            openOnClick
            place="bottom-start"
            noArrow
            className={`menu-context${!isToolTipActive ? " d-none" : ""}`}
         >
            <div ref={toolTipRef} className="item-options">
               <Link className="item-element" href={`/app/quick-notes/${quickNote.id}`}>
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

export default BlockItem;

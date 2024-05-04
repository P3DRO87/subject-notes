import React, { useState } from "react";
import BlockMenuContext from "./BlockMenuContext";
import { useRef } from "react";
import { useRouter } from "next/router";
import { RxDotsHorizontal } from "react-icons/rx";
import Link from "next/link";

const TaskItem = ({ task }) => {
   const { asPath } = useRouter();

   const menuContextRef = useRef();

   const [isToolTipActive, setIsToolTipActive] = useState(false);

   const handleOpenTooltip = (e) => {
      e.preventDefault();
      setIsToolTipActive(true);
   };

   return (
      <>
         <Link
            href={`/app/tasks/signature/${task.id}`}
            className="block-item d-flex align-items-center justify-content-between mb-3"
         >
            <h3 className="title mb-0">{task.name}</h3>
            <button
               ref={menuContextRef}
               data-tooltip-id={task.id}
               onClick={handleOpenTooltip}
               className="btn-primary delete-btn"
            >
               <RxDotsHorizontal />
            </button>
         </Link>
         <BlockMenuContext
            id={task.id}
            isActive={isToolTipActive}
            setIsActive={setIsToolTipActive}
            triggerRef={menuContextRef}
            itemLinkText="Ir a la tarea"
            itemLink={`/app/tasks/signature/${task.id}`}
         />
      </>
   );
};

export default TaskItem;

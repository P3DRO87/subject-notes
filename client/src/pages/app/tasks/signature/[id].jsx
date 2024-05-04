import RichTextEditor from "@/components/sections/RichTextEditor";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import React from "react";

const TaskSignatureSingle = () => {
   return (
      <LoggedInLayout pageTitle="Current task" blockTitle="Title">
         <div className="task-single-page h-100 position-relative d-flex flex-column">
            <div className="task-block-item-container">
               <div className="task-block-item position-relative">
                  <div
                     style={{ width: 816, height: 1344 }}
                     className="content position-abosolute"
                  >
                     <RichTextEditor />
                  </div>
               </div>
            </div>
            <div className="pagination-container"></div>
         </div>
      </LoggedInLayout>
   );
};

export default TaskSignatureSingle;

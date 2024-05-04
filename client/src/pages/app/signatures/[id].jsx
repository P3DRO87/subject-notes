import RichTextEditor from "@/components/sections/RichTextEditor";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import React from "react";

const SignatureSingle = () => {
   return (
      <LoggedInLayout
         isBlockHeaderBtnDisable
         pageTitle="Asignaturas"
         blockTitle="Signature Name"
      >
         <div className="signature-page h-100 position-relative d-flex flex-column">
            <div className="signature-block-item-container">
               <div className="signature-block-item position-relative">
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

export default SignatureSingle;

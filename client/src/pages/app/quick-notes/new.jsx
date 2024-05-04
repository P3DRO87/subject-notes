import Input from "@/components/fragments/Input";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import React from "react";

const NewNote = () => {
   return (
      <LoggedInLayout
         buttonText="Nueva nota"
         pageTitle="Notas rapidas"
         blockTitle="Notas rapidas"
      >
         <div className="new-note-page mt-5">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-6">
                     <form className="new-note-form">
                        <Input label="Hola" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </LoggedInLayout>
   );
};

export default NewNote;

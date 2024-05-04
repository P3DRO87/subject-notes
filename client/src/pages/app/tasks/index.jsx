import LoggedInLayout from "@/components/templates/LoggedInLayout";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Tasks = () => {
   const { signatures } = useSelector((state) => state.signatures);

   return (
      <LoggedInLayout
         pageTitle="Tareas"
         blockTitle="Tareas"
         buttonText="Nueva tarea"
         isBlockHeaderBtnDisable
      >
         <div className="tasks-page">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-8 mt-5">
                     <div className="block-item task-block-item muted mb-3">
                        <h3 className="title">Lista de tareas</h3>
                        <p className="description">
                           Puedes asignar tareas indivualmente a cada una de tus
                           asignaturas. Asegurate que tienes al menos 1 asignatura para
                           poder agregar tareas
                        </p>
                     </div>
                     {signatures.map((signature) => (
                        <Link
                           href={`/app/tasks/${signature.id}`}
                           key={signature.id}
                           className="block-item mb-3 d-flex"
                        >
                           <h3 className="title mb-0">{signature.name}</h3>
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </LoggedInLayout>
   );
};

export default Tasks;

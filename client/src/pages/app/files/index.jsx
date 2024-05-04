import LoggedInLayout from "@/components/templates/LoggedInLayout";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Files = () => {
   const { signatures } = useSelector((state) => state.signatures);

   return (
      <LoggedInLayout pageTitle="Archivos" blockTitle="Archivos" isBlockHeaderBtnDisable>
         <div className="files-page">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-8 mt-5">
                     <div className="block-item muted mb-3">
                        <h2 className="title">Lista de archivos</h2>
                        <p className="description">
                           Puedes asignar archivos indivualmente a cada una de tus
                           asignaturas. Asegurate que tienes al menos 1 asignatura para
                           poder agregar archivos
                        </p>
                     </div>
                     {signatures.map((signature) => (
                        <Link href={"#"} className="block-item mb-3 d-flex">
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

export default Files;

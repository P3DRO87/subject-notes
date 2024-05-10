import Pagination from "@/components/fragments/Pagination";
import RichTextEditor from "@/components/sections/RichTextEditor";
import LoggedInLayout from "@/components/templates/LoggedInLayout";
import { getSignature } from "@/helpers/signatures-db";
import { getAllSignaturesPages } from "@/helpers/signatures-pages";
import useItemsId from "@/hooks/useItemsId";
import React, { Fragment, useEffect, useState } from "react";

const contentType = {
   "rich-text": <RichTextEditor />,
   draw: "comming soon",
};

const SignatureSingle = ({ signature }) => {
   const { pages } = signature;

   const [selectedPageIdx, setSelectedPageIdx] = useState(0);

   const selectedPage = pages[selectedPageIdx];

   useEffect(() => {
      localStorage.selectedPageIdx = selectedPageIdx;
   }, [selectedPageIdx]);

   useEffect(() => {
      const selectedPageIdxLS = localStorage.getItem("selectedPageIdx");

      if (selectedPageIdxLS) setSelectedPageIdx(+selectedPageIdxLS);
   }, []);

   return (
      <LoggedInLayout
         pageTitle="Asignaturas"
         blockTitle={signature.name}
         buttonText="Añadir nueva pagina"
         onBtnHeaderClick={() => console.log("add new page")}
      >
         <div className="signature-page h-100 position-relative d-flex flex-column">
            <div className="signature-block-item-container">
               <div className="signature-block-item position-relative">
                  {pages.length > 0 && (
                     <div
                        style={{ width: 816, height: 1344 }}
                        className="content position-abosolute"
                     >
                        {selectedPage.content.map(({ type, content, id }) => (
                           <Fragment key={id}>{contentType[type]}</Fragment>
                        ))}
                     </div>
                  )}
               </div>
            </div>
            <div className="pagination-container d-flex justify-content-center">
               <Pagination />
            </div>
         </div>
      </LoggedInLayout>
   );
};

export const getServerSideProps = async ({ params, req }) => {
   const { id } = params;
   const token = req?.cookies["token"];

   const [signatureRes, signaturePagesRes] = await Promise.all([
      getSignature({ id, token }),
      getAllSignaturesPages({ id, token }),
   ]);

   if (!signatureRes) return { notFound: true };

   const [{ signature }] = signatureRes;

   const [{ signaturePages }] = signaturePagesRes;

   return {
      props: {
         signature: { ...signature, ...signaturePages },
      },
   };
};

export default SignatureSingle;

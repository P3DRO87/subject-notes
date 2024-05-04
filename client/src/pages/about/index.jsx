import Link from "next/link";
import React from "react";

export default function Blog() {
   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col-sm-auto">
                  <h1 className="mb-3">Blog page</h1>
                  <Link href="/">Back to home</Link>
               </div>
            </div>
         </div>
      </>
   );
}

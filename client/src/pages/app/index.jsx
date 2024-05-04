import LoggedInLayout from "@/components/templates/LoggedInLayout";
import Head from "next/head";
import React from "react";

const App = () => {
   return (
      <>
         <Head>
            <title>Hola</title>
            <meta
               name="description"
               content="Subject notes es una aplicacion que potencia y facilita la productividad de tus apuntes escolares"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <LoggedInLayout />
      </>
   );
};

export default App;

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
               href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Shippori+Mincho&display=swap"
               rel="stylesheet"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
               href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
               rel="stylesheet"
            />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}

const maxArea = (array) => {
   let area = 0;
   for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
         const height = Math.min(array[i], array[j]);
         const width = j - i;
         area = Math.max(area, height * width);
      }
   }
};

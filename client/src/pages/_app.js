import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { reduxWrapper } from "@/redux/store";
import AppWrapper from "@/components/templates/AppWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;

export default function App({ Component, pageProps: { ...pageProps }, ...rest }) {
   const { store } = reduxWrapper.useWrappedStore(rest);

   const getLayout = Component.getLayout || ((page) => page);

   return (
      <Provider store={store}>
         <AppWrapper>
            <GoogleOAuthProvider clientId={googleId}>
               <>{getLayout(<Component {...pageProps} />)}</>
            </GoogleOAuthProvider>
         </AppWrapper>
      </Provider>
   );
}

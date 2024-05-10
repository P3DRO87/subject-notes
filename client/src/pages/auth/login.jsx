import GoogleLogo from "@/components/fragments/GoogleLogo";
import Input from "@/components/fragments/Input";
import Toast from "@/components/fragments/Toast";
import { googleLogin, loginUser } from "@/helpers/auth-user";
import { isValidEmail } from "@/helpers/validations";
import { setUser } from "@/redux/userDux";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { VscError } from "react-icons/vsc";
import { useDispatch } from "react-redux";

const Login = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const [isAlertActive, setIsAlertActive] = useState(false);
   const [alertMsg, setAlertMsg] = useState("");
   const [isReqLoading, setIsReqLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleLogin = async (formData) => {
      setIsReqLoading(true);

      const [userRes, errMsg] = await loginUser({ ...formData, google: false });

      setIsReqLoading(false);

      if (errMsg) {
         setAlertMsg(errMsg);
         return setIsAlertActive(true);
      }

      dispatch(setUser(userRes.user));

      localStorage.token = userRes.token;
      localStorage.user = JSON.stringify(userRes.user);
      Cookies.set("user", JSON.stringify(userRes.user));
      Cookies.set("token", userRes.token);

      router.replace("/app");
   };

   const handleGoogleLogin = useGoogleLogin({
      onSuccess: async (tokenRes) => {
         const [googleUserRes, loginErr] = await googleLogin({
            token: tokenRes.access_token,
         });

         if (loginErr) {
            setIsAlertActive(true);
            return setAlertMsg("Failed to login");
         }

         dispatch(setUser(googleUserRes.user));

         localStorage.token = googleUserRes.token;
         localStorage.user = JSON.stringify(googleUserRes.user);
         Cookies.set("user", JSON.stringify(googleUserRes.user));
         Cookies.set("token", googleUserRes.token);

         router.replace("/app");
      },
      onError: () => {
         setIsAlertActive(true);
         setAlertMsg("Failed to login");
      },
   });

   return (
      <>
         <Toast isToastActive={isAlertActive} setIsToastActive={setIsAlertActive}>
            <div className="alert-toast-content d-flex gap-2 align-items-center">
               <VscError />
               <span>{alertMsg}</span>
            </div>
         </Toast>
         <div className="login-page">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-5">
                     <form onSubmit={handleSubmit(handleLogin)} className="login-form">
                        <h2 className="title">Login</h2>
                        <p className="login-description">
                           Introduce tu correo acontinuacion para iniciar sesion en tu
                           cuenta
                        </p>
                        <Input
                           label="Email"
                           placeholder="m@ejemplo.com"
                           {...register("email", {
                              required: "El email es requrido",
                              validate: (email) =>
                                 isValidEmail(email) || "Email invalido",
                           })}
                           error={!!errors.email}
                           helperText={errors.email?.message}
                        />
                        <Input
                           label="Contraseña"
                           {...register("password", {
                              required: "La contraseña es requrida",
                           })}
                           error={!!errors.password}
                           helperText={errors.password?.message}
                        />
                        <button
                           disabled={isReqLoading}
                           type="submit"
                           className={`btn-primary submit-btn w-100${
                              isReqLoading ? " muted" : ""
                           }`}
                        >
                           Iniciar sesion
                        </button>

                        <button
                           type="button"
                           onClick={handleGoogleLogin}
                           className="google-btn"
                        >
                           <GoogleLogo /> Iniciar sesion con google
                        </button>
                        <Link className="auth-link mt-4" href="/auth/register">
                           Registrarse
                        </Link>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;

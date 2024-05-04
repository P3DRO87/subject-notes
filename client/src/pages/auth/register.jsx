import Input from "@/components/fragments/Input";
import Toast from "@/components/fragments/Toast";
import { registerUser } from "@/helpers/auth-user";
import { addNewNoteDB } from "@/helpers/quick-notes";
import { isEmail } from "@/helpers/validations";
import { initialNote } from "@/redux/quickNotesDux";
import { setUser } from "@/redux/userDux";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { VscError } from "react-icons/vsc";
import { useDispatch } from "react-redux";

const Register = () => {
   const router = useRouter();

   const dispatch = useDispatch();

   const [isAlertActive, setIsAlertActive] = useState(false);
   const [alertMsg, setAlertMsg] = useState("");
   const [isReqLoading, setIsReqLoading] = useState(false);

   const {
      getValues,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleRegister = async (formValues) => {
      const { repeatPass, ...rest } = formValues;

      setIsReqLoading(true);

      const [userRes, errMsg] = await registerUser(rest);
      await addNewNoteDB({ ...initialNote, token: userRes.token });

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

   return (
      <>
         <Toast isToastActive={isAlertActive} setIsToastActive={setIsAlertActive}>
            <div className="alert-toast-content d-flex gap-2 align-items-center">
               <VscError />
               <span>{alertMsg}</span>
            </div>
         </Toast>
         <div className="register-page">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-5">
                     <form onSubmit={handleSubmit(handleRegister)} className="login-form">
                        <h2 className="title">Registrarse</h2>
                        <p className="login-description">
                           Crea una nueva cuenta llenando los campos acontinuacion
                        </p>
                        <Input
                           label="Nombre"
                           {...register("name", {
                              required: "El nombre es requerido",
                           })}
                           error={!!errors.name}
                           helperText={errors.name?.message}
                        />
                        <Input
                           label="Email"
                           placeholder="m@ejemplo.com"
                           {...register("email", {
                              required: "El email es requrido",
                              validate: (email) => isEmail(email) || "Email Invalido",
                           })}
                           error={!!errors.email}
                           helperText={errors.email?.message}
                        />
                        <Input
                           label="Contraseña"
                           {...register("password", {
                              required: "La contraseña es requrida",
                              minLength: {
                                 value: 6,
                                 message: "Password should be more than 5 characters",
                              },
                           })}
                           error={!!errors.password}
                           helperText={errors.password?.message}
                        />
                        <Input
                           label="Repetir contraseña"
                           {...register("repeatPass", {
                              required: "Repetir la contraseña es requerido",
                              validate: (repeatPass) =>
                                 getValues("password") === repeatPass ||
                                 "Ambas contraseñas deben ser iguales",
                           })}
                           error={!!errors.repeatPass}
                           helperText={errors.repeatPass?.message}
                        />
                        <button
                           disabled={isReqLoading}
                           type="submit"
                           className={`btn-primary submit-btn w-100${
                              isReqLoading ? " muted" : ""
                           }`}
                        >
                           Registrarse
                        </button>
                        <Link className="auth-link mt-4" href="/auth/login">
                           Iniciar sesion
                        </Link>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;

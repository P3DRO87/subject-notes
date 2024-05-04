import BurgerBtn from "@/components/fragments/BurgerBtn";
import Logo from "@/components/fragments/Logo";
import TypeWriter from "@/components/fragments/TypeWriter";
import { ActiveClassEl, TrasitionTrigger } from "@/components/utils/TrasitionTrigger";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
   const [isMobileNavActive, setIsMobileNavActive] = useState(false);

   return (
      <>
         <Head>
            <title>Subject notes</title>
            <meta
               name="description"
               content="Subject notes es una aplicacion que potencia y facilita la productividad de tus apuntes escolares"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo-icon.svg" />
         </Head>
         <div className="home-page-wrapper">
            <div className="container header-container">
               <div className="row justify-content-center">
                  <div className="col-lg-8 position-relative">
                     <header className="header">
                        <Link href="/">
                           <Logo />
                        </Link>
                        <nav className="d-md-block d-none">
                           <Link className="link-item" href="/about">
                              Acerca de
                           </Link>
                        </nav>
                        <nav className="account-links d-md-flex d-none">
                           <Link className="link-item" href="/auth/login">
                              Iniciar sesion
                           </Link>
                           <Link
                              className="link-item btn-primary register-btn"
                              href="/auth/register"
                           >
                              Registrarse gratis <FaLongArrowAltRight />
                           </Link>
                        </nav>
                        <div
                           onClick={() => setIsMobileNavActive(!isMobileNavActive)}
                           className="d-md-none d-block"
                        >
                           <BurgerBtn isActive={isMobileNavActive} />
                        </div>
                     </header>
                     <TrasitionTrigger activeClass="active" trigger={isMobileNavActive}>
                        <ActiveClassEl el="nav" className="mobile-nav position-absolute">
                           <Link className="link-item" href="/about">
                              Acerca de
                           </Link>
                           <Link className="link-item" href="/auth/login">
                              Iniciar sesion
                           </Link>
                           <Link
                              className="link-item btn-primary register-btn"
                              href="/auth/register"
                           >
                              Registrarse gratis <FaLongArrowAltRight />
                           </Link>
                        </ActiveClassEl>
                     </TrasitionTrigger>
                  </div>
               </div>
            </div>
            <div className="home-page position-relative">
               <div className="hero-blob-container position-absolute">
                  <div className="blob-img-container"></div>
               </div>
               <div className="main-content-wrapper">
                  <main className="main">
                     <div className="container">
                        <div className="row justify-content-center">
                           <div className="col-lg-12">
                              <h1 className="main-text">
                                 El Editor que permite potenciar tu productividad con
                                 <div className="type-writer-container">
                                    <TypeWriter
                                       texts={[
                                          "Una gran cantidad de herramientas innovadoras",
                                          "funciones personalizadas",
                                          "Una interfaz de usuario intuitiva, minimalista y facil de utilizar",
                                       ]}
                                    />
                                 </div>
                              </h1>
                           </div>
                        </div>
                     </div>
                  </main>
               </div>
            </div>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-10">
                     <p className="main-description">
                        Subject notes es una aplicacion con el proposito de llevar un
                        seguimiento continuo y eficiente de los apuntes de de cualquier
                        tipo de organizacion u organismo educativo, tanto para estudiantes
                        como para docentes
                     </p>
                  </div>
               </div>
               <div className="row justify-content-center">
                  <div className="col-sm-auto col-auto">
                     <Link
                        className="link-item btn-primary register-btn description-btn"
                        href="/auth/register"
                     >
                        Registrarse gratis <FaLongArrowAltRight />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

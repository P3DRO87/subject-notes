import React, { useEffect, useRef, useState } from "react";
import CurrentBlock from "../sections/CurrentBlock";
import DashboardSidebar from "../sections/DashboardSidebar";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Logout from "../fragments/icons/Logout";
import { ActiveClassEl, TrasitionTrigger } from "../utils/TrasitionTrigger";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userDux";
import { renewToken } from "@/helpers/auth-user";
import Toast from "../fragments/Toast";
import { setIsToastActive } from "@/redux/ui";

const getUserDefaultImg = (name = "") => {
   const [firstChar] = name;

   return `https://placehold.co/50x50?text=${firstChar}`;
};

const LoggedInLayout = ({
   children,
   pageTitle = "Subject notes",
   blockTitle = "",
   isBlockHeaderBtnDisable = false,
   buttonText = "",
   onBtnHeaderClick = function () {},
}) => {
   const router = useRouter();

   const dispatch = useDispatch();

   const { user = {} } = useSelector((state) => state.user);

   const { isToastActive, toastMsg } = useSelector((state) => state.ui);

   const [isDropdownActive, setIsDropdownActive] = useState(false);

   const userBtnRef = useRef();
   const dropdownRef = useRef();

   const handleLogout = () => {
      Cookies.remove("user");
      Cookies.remove("token");
      localStorage.clear();
      router.push("/");
   };

   useEffect(() => {
      const lsToken = localStorage.getItem("token");

      const fetchToken = async () => {
         const [tokenData] = await renewToken(lsToken);

         if (tokenData) {
            Cookies.set("user", JSON.stringify(tokenData.user));
            Cookies.set("token", lsToken);
         }

         dispatch(setUser(tokenData?.user || null));
      };

      if (lsToken && !user) fetchToken();
   }, [dispatch, user]);

   useEffect(() => {
      document.addEventListener("click", ({ target }) => {
         if (userBtnRef.current === target || userBtnRef.current?.contains(target)) {
            return;
         }

         setIsDropdownActive(false);
      });
   }, [isDropdownActive]);

   useEffect(() => {
      const pathSections = router.asPath.split("/");

      Cookies.set("currentMainPage", pathSections[2]);
   }, [router.asPath]);

   return (
      <>
         <Head>
            <title>{pageTitle}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/logo-icon.svg" />
         </Head>
         <Toast
            onToastHide={() => dispatch(setIsToastActive(false))}
            isToastActive={isToastActive}
         >
            {toastMsg}
         </Toast>
         <main>
            <div className="app-active-container">
               <div className="container-fluid p-0">
                  <div className="row g-0">
                     <div className="col-lg-2 position-relative d-lg-block d-none">
                        <DashboardSidebar />
                        <div className="user-section position-absolute">
                           <TrasitionTrigger
                              activeClass="active"
                              trigger={isDropdownActive}
                           >
                              <ActiveClassEl className="user-dropdown-container">
                                 <div
                                    ref={dropdownRef}
                                    className="user-dropdown position-absolute"
                                 >
                                    <button
                                       onClick={handleLogout}
                                       className="d-flex gap-2 logout-btn align-items-center"
                                    >
                                       <Logout />
                                       <span className="text">Cerrar sesion</span>
                                    </button>
                                 </div>
                              </ActiveClassEl>
                           </TrasitionTrigger>
                           <button
                              ref={userBtnRef}
                              onClick={() => setIsDropdownActive(!isDropdownActive)}
                              className="user-selection-item d-flex gap-2 align-items-center"
                           >
                              <div className="user-img-container">
                                 <img
                                    src={user?.picture || getUserDefaultImg(user?.name)}
                                    alt={`Foto de perfil de ${user?.name}`}
                                 />
                              </div>
                              <h3 className="user-name">{user?.name}</h3>
                           </button>
                        </div>
                     </div>
                     <div className="col-lg-10">
                        <CurrentBlock
                           onBtnHeaderClick={onBtnHeaderClick}
                           isBlockHeaderBtnDisable={isBlockHeaderBtnDisable}
                           buttonText={buttonText}
                           blockTitle={blockTitle}
                        >
                           {children}
                        </CurrentBlock>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
};

export default LoggedInLayout;

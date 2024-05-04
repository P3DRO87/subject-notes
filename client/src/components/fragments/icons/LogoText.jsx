import React from "react";

const LogoText = ({ className = "" }) => {
   return (
      <svg
         className={className}
         viewBox="0 0 122 31"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M4.61273 14.1835C4.4754 14.7522 4.22821 15.1043 4.00849 15.1313C3.43171 15.2397 3.87116 14.4814 3.81623 14.1835C3.73383 13.7503 3.04719 14.1835 3.04719 14.5356C3.04719 15.1043 3.26692 15.7 3.73383 16.2958L3.81623 16.3228C5.05218 15.3209 7.52407 14.6981 7.55154 14.6981C7.55154 14.6981 7.68887 14.7251 7.68887 14.8335C7.71633 14.9147 7.579 15.1043 7.579 15.1043C6.70011 15.1043 4.14581 16.8644 4.06342 16.8644C4.66766 17.8664 4.06342 19.437 3.04719 20.0598C2.63521 20.4119 2.11336 20.6285 1.53659 20.7097C0.822483 20.6014 0.465431 20.3848 0.465431 20.0328V19.8432C0.465431 19.3016 2.77254 17.1894 3.18452 16.8644C3.23945 16.7832 3.23945 16.8103 3.23945 16.729C2.60774 15.8354 2.30562 15.1313 2.30562 14.5897C2.47042 12.6671 4.61273 13.4795 4.61273 14.1835ZM1.26193 19.9515V19.9786C1.26193 20.0598 1.37179 20.114 1.53659 20.114C2.25069 20.114 4.00849 18.5434 3.65143 17.4602L3.6789 17.2165L3.51411 17.4602C2.25069 18.4621 1.26193 19.6807 1.26193 19.9515ZM17.3856 16.5124C17.3856 16.5124 17.5229 16.377 17.7152 16.4582C17.9349 16.5666 17.7152 16.8103 17.7152 16.8103C17.0285 17.6497 14.9686 19.2474 13.87 19.2474C13.5129 19.2474 13.3207 19.112 13.2108 18.9766C12.9911 18.7058 12.8538 18.1913 13.5129 16.4853C11.453 18.8412 10.7938 18.6246 10.5741 18.5705C10.4093 18.5163 10.0797 18.3538 10.0523 17.7851V17.7581C9.96988 16.6207 11.6178 13.3441 12.1671 13.3712C12.1671 13.3712 12.5791 13.5066 12.5791 13.6961C12.5516 14.0482 12.3319 14.3189 12.1671 14.2919C11.6727 14.0211 10.7938 16.8374 10.8213 17.731C10.8213 17.7581 10.8488 17.7851 10.8488 17.8122C11.1784 17.731 12.1397 16.9998 13.6228 15.1313C14.0897 14.5627 14.4193 14.1565 14.639 13.9128C14.8587 13.642 15.0785 13.3712 15.3806 13.6149C15.4905 13.6961 15.6278 13.9128 15.463 14.1565C14.4468 16.1062 13.7052 18.0559 13.8151 18.4621C13.9524 18.8683 14.6665 18.6517 15.6003 18.0289C16.287 17.5685 17.0285 16.9457 17.3856 16.5124ZM29.3619 0.806211C29.6915 1.02285 29.3619 1.56444 29.3619 1.56444C27.5217 5.19311 23.7315 12.8566 21.4244 18.1101C21.8364 17.7039 22.2483 17.406 22.7153 17.3519C23.0998 17.2977 23.4568 17.406 23.7864 17.7039C23.8688 17.7851 24.0336 18.0018 24.116 18.1101C24.7202 17.2977 25.297 16.5124 25.7639 15.9708C26.0111 15.6729 26.1485 15.348 26.2858 15.2126C26.6428 14.8335 27.1372 15.2397 26.8351 15.5646C26.7252 15.6729 26.4506 15.9437 26.1485 16.2958C25.709 16.8915 25.1322 17.7581 24.4181 18.7058C24.6378 19.3828 24.6104 20.1952 24.3357 21.0889C23.8413 22.6595 22.5505 24.3926 21.2321 24.5821H21.0948C20.7103 24.5821 20.5455 24.3384 20.518 24.2301C20.3807 23.9864 20.106 23.3635 22.935 19.4099C23.1272 19.1662 23.3195 18.8954 23.5118 18.6246C23.4568 18.4892 23.347 18.3809 23.2371 18.2726C23.0448 18.1101 22.9075 18.1101 22.8251 18.1101C22.2483 18.1913 20.9025 20.1681 20.0511 21.4409C19.7215 22.3345 19.5293 23.0115 19.5293 23.3365C19.5293 23.3365 19.4194 23.5802 19.0898 23.5802C18.7328 23.5802 18.7328 23.3365 18.7328 23.3365C18.7328 20.8722 27.6316 3.2163 28.6478 1.23949C28.6478 1.23949 29.0323 0.589574 29.3619 0.806211ZM23.7864 19.5995C23.7315 19.6536 23.704 19.6807 23.6766 19.7349C21.9462 22.145 21.3694 23.3365 21.2596 23.7697C22.0836 23.5531 23.1547 22.2262 23.5942 20.8451C23.6766 20.5743 23.7864 20.0869 23.7864 19.5995ZM35.5705 16.025C35.6254 16.4041 35.0487 16.3228 35.0487 16.3228C34.7465 16.377 34.417 16.5666 34.1423 16.6749C33.181 16.9998 32.412 17.6768 31.588 18.2997C29.7203 23.0657 26.9738 29.5648 25.2984 30.7563C25.0512 30.9188 24.8315 31 24.6667 31C24.5294 31 24.4195 30.9458 24.3096 30.8917C23.9526 30.675 23.8427 30.1335 23.98 29.1857C24.392 26.7485 26.8639 21.0076 30.9288 17.8122C31.5056 16.2958 32.0275 14.8876 32.4394 13.7503C31.3408 14.7251 30.3246 15.9437 30.1049 16.1874C30.0499 16.2687 29.8302 16.6478 29.583 16.6478C29.3084 16.6478 29.3358 16.4582 29.4457 16.3499C29.9126 15.8083 32.2746 12.8025 33.2909 12.5588C33.5381 12.5046 33.5381 13.0462 33.5381 13.0462C33.4557 13.2628 32.824 15.023 32 17.1894C32.6042 16.8103 33.2909 16.4312 33.95 16.1874C34.2522 16.0791 34.6092 15.9979 34.9663 15.9166C34.9663 15.9166 35.5156 15.6458 35.5705 16.025ZM24.8315 30.1064C26.1498 29.1857 28.4295 24.0947 30.2971 19.4099C28.1548 21.495 26.5069 24.3113 25.5181 26.7485C24.7491 28.7253 24.6667 29.8627 24.7491 30.1876C24.7491 30.1605 24.804 30.1605 24.8315 30.1064ZM34.1148 10.9882C34.1698 11.2589 34.1972 11.4756 33.95 11.5297C33.7028 11.5568 33.4831 11.3402 33.4282 11.0694C33.4007 10.7986 33.5655 10.5278 33.7852 10.5007C34.0324 10.4736 34.1698 10.6903 34.1148 10.9882ZM45.4045 15.0501C45.6517 15.2397 45.2947 15.4563 45.2947 15.4563C45.0749 15.7 41.9988 19.1662 39.6917 18.9496C39.6093 18.9496 39.5269 18.9225 39.4445 18.9225C39.1699 18.8683 38.8128 18.6788 38.5931 18.1643C37.9888 16.6478 38.9776 15.0501 40.1586 14.1835C40.9002 13.642 41.5594 13.5066 41.9439 13.8315C42.1361 13.9669 42.246 14.1835 42.2185 14.4273C42.1911 15.2397 40.6805 16.3228 40.2136 16.6207C40.2136 16.6207 40.0213 16.6749 39.8016 16.4582C39.5818 16.2145 39.7741 15.9708 39.7741 15.9708C40.5981 15.4292 41.3396 14.7251 41.422 14.4273C41.2572 14.4273 40.7629 14.6168 40.1861 15.1855C39.5269 15.8625 38.9501 16.9186 39.3347 17.8664C39.7192 18.5975 40.7354 18.2184 41.5594 17.8935C42.4383 17.5685 44.3334 15.9166 44.7728 15.4021C44.7728 15.4021 45.0475 14.7251 45.4045 15.0501ZM54.3871 15.023C54.6343 15.2397 54.2773 15.4292 54.2773 15.4292C53.9477 15.8354 50.7892 18.9766 48.949 18.9766C48.7292 18.9766 48.537 18.9225 48.3722 18.8412C48.0975 18.7058 47.6581 18.3267 47.7405 17.3789C47.8778 16.025 49.0863 14.0211 50.3497 13.5878C50.899 13.3982 51.3659 13.4253 51.6681 13.6961C52.2174 14.1565 51.723 14.9959 51.6955 15.1043C51.6955 15.1043 51.5582 15.3751 51.2561 15.348C50.9814 15.348 50.7892 15.023 50.7892 15.023C50.8441 14.8064 51.2835 14.4002 51.1737 14.2919C51.0638 14.2106 50.8715 14.2377 50.5969 14.3189C49.7455 14.6168 48.6468 16.2958 48.537 17.4602C48.5095 17.7039 48.537 18.2726 48.7567 18.3809C49.5532 18.8142 52.8216 16.5124 53.7554 15.3751C53.7554 15.3751 54.0301 14.7251 54.3871 15.023ZM82.7329 3.70373C83.1999 3.89329 82.6231 4.35364 82.4308 4.2724H82.4034C79.4645 3.02674 71.0601 2.8101 64.4134 3.05382C61.3373 8.60514 57.1076 16.3228 57.2999 20.7368C57.3273 20.9264 57.3823 21.1159 57.4921 21.1701C58.5358 21.6846 60.4859 17.7581 61.2 16.6749C61.2 16.6749 61.4472 16.025 61.8042 16.3228C62.0514 16.5395 61.7218 16.729 61.7218 16.729C61.3648 17.1352 58.8379 21.82 57.6569 21.7388C56.5583 21.6575 56.5308 20.7368 56.5308 20.7368C56.366 16.1604 60.3485 8.84886 63.3972 3.13506C58.8379 3.32462 55.2125 3.75789 55.1301 3.78497C55.1301 3.78497 54.6906 3.59541 54.6906 3.29754C54.6906 2.89134 55.2125 2.75595 55.2125 2.75595C55.597 2.75595 59.3048 2.51223 63.8916 2.40391C64.6057 1.04993 64.9902 0.454176 65.0726 0.291698C65.0726 0.291698 65.4297 -0.141576 65.8966 0.0479814C66.2536 0.210459 66.1163 0.670813 66.1163 0.670813C66.1163 0.697893 65.6219 1.15825 64.9353 2.37683C71.4995 2.24143 79.6843 2.40391 82.7329 3.70373ZM83.0653 15.9437C83.2301 15.5917 83.6146 15.7 83.5597 15.8354C82.2688 18.8683 79.33 21.3867 78.506 21.3867C78.4236 21.3867 78.3687 21.3597 78.3412 21.3597C78.2039 21.3326 77.9018 21.1972 77.9018 20.7097C77.8743 20.0057 78.4236 18.9766 79.0278 17.8122C79.3849 17.0811 79.7419 16.3228 79.9342 15.7271C80.1539 15.1313 80.099 14.8064 80.0715 14.7251C79.3025 14.5085 78.094 16.4312 77.4623 17.4873C76.8031 18.5434 76.5285 18.9766 76.089 18.8954C75.9792 18.8954 75.7594 18.8142 75.677 18.4351C75.4024 17.1623 76.913 14.671 77.0503 14.4002C77.0503 14.4002 77.2426 13.7503 77.8743 14.1835C78.1764 14.3731 77.6271 14.7522 77.6271 14.7522C77.2151 15.4563 76.6658 16.6749 76.501 17.5414C76.5834 17.3789 76.6933 17.2165 76.7757 17.0811C77.737 15.5105 79.0553 13.3982 80.456 14.0482L80.511 14.0752L80.5659 14.1023C81.3349 14.7522 80.5934 16.2687 79.7419 18.0289C79.3025 18.8954 78.8356 19.8703 78.7257 20.466C79.5497 20.5743 81.8019 18.5163 83.0653 15.9437ZM93.8881 14.4002C93.9155 14.7251 93.5036 14.6439 93.5036 14.6439C93.3113 14.671 92.6521 14.6981 91.7732 14.671C91.4162 14.671 91.0866 14.671 90.9767 14.6981C91.0042 15.348 90.757 16.1062 90.3725 16.8103C89.7408 17.8935 88.7246 18.8683 87.7358 18.8683C87.4886 18.8683 87.2414 18.8142 86.9942 18.6788C86.6097 18.4621 86.39 18.1372 86.3076 17.731C86.0329 16.1062 88.9992 12.9108 89.2739 12.6129C89.2739 12.6129 89.6034 12.288 89.8232 12.4234C90.1802 12.6671 89.8781 13.0191 89.8781 13.0191C88.8893 14.0752 86.9393 16.6749 87.0766 17.5956C87.1041 17.7851 87.1865 18.083 87.3513 18.1643C88.0654 18.5434 89.0816 17.4602 89.6584 16.4312C90.0154 15.8354 90.2077 15.1584 90.1802 14.671C89.8232 14.5897 89.6034 14.4543 89.5211 14.2377C89.3837 13.9398 89.576 13.6149 89.7957 13.4253L90.0154 13.2628L90.2626 13.3982C90.4823 13.5336 90.6471 13.6961 90.7845 13.9128C90.9218 14.0752 91.1141 14.1565 91.3063 14.2106C92.0479 14.2919 92.7345 14.2919 93.174 14.2377C93.174 14.2377 93.8331 13.9398 93.8881 14.4002ZM121.822 3.70373C122.289 3.89329 121.712 4.35364 121.52 4.2724H121.492C118.553 3.02674 110.149 2.8101 103.502 3.05382C100.426 8.60514 96.1965 16.3228 96.3888 20.7368C96.4163 20.9264 96.4712 21.1159 96.5811 21.1701C97.6248 21.6846 99.5748 17.7581 100.289 16.6749C100.289 16.6749 100.536 16.025 100.893 16.3228C101.14 16.5395 100.811 16.729 100.811 16.729C100.454 17.1352 97.9269 21.82 96.7459 21.7388C95.6472 21.6575 95.6198 20.7368 95.6198 20.7368C95.455 16.1604 99.4375 8.84886 102.486 3.13506C97.9269 3.32462 94.3014 3.75789 94.219 3.78497C94.219 3.78497 93.7796 3.59541 93.7796 3.29754C93.7796 2.89134 94.3014 2.75595 94.3014 2.75595C94.6859 2.75595 98.3938 2.51223 102.981 2.40391C103.695 1.04993 104.079 0.454176 104.162 0.291698C104.162 0.291698 104.519 -0.141576 104.986 0.0479814C105.343 0.210459 105.205 0.670813 105.205 0.670813C105.205 0.697893 104.711 1.15825 104.024 2.37683C110.588 2.24143 118.773 2.40391 121.822 3.70373ZM110.974 15.0501C111.222 15.2397 110.865 15.4563 110.865 15.4563C110.645 15.7 107.569 19.1662 105.262 18.9496C105.179 18.9496 105.097 18.9225 105.014 18.9225C104.74 18.8683 104.383 18.6788 104.163 18.1643C103.559 16.6478 104.547 15.0501 105.728 14.1835C106.47 13.642 107.129 13.5066 107.514 13.8315C107.706 13.9669 107.816 14.1835 107.788 14.4273C107.761 15.2397 106.25 16.3228 105.783 16.6207C105.783 16.6207 105.591 16.6749 105.371 16.4582C105.152 16.2145 105.344 15.9708 105.344 15.9708C106.168 15.4292 106.909 14.7251 106.992 14.4273C106.827 14.4273 106.333 14.6168 105.756 15.1855C105.097 15.8625 104.52 16.9186 104.904 17.8664C105.289 18.5975 106.305 18.2184 107.129 17.8935C108.008 17.5685 109.903 15.9166 110.343 15.4021C110.343 15.4021 110.617 14.7251 110.974 15.0501ZM116.579 14.1835C116.441 14.7522 116.194 15.1043 115.974 15.1313C115.398 15.2397 115.837 14.4814 115.782 14.1835C115.7 13.7503 115.013 14.1835 115.013 14.5356C115.013 15.1043 115.233 15.7 115.7 16.2958L115.782 16.3228C117.018 15.3209 119.49 14.6981 119.518 14.6981C119.518 14.6981 119.655 14.7251 119.655 14.8335C119.682 14.9147 119.545 15.1043 119.545 15.1043C118.666 15.1043 116.112 16.8644 116.029 16.8644C116.634 17.8664 116.029 19.437 115.013 20.0598C114.601 20.4119 114.079 20.6285 113.503 20.7097C112.788 20.6014 112.431 20.3848 112.431 20.0328V19.8432C112.431 19.3016 114.739 17.1894 115.151 16.8644C115.205 16.7832 115.205 16.8103 115.205 16.729C114.574 15.8354 114.272 15.1313 114.272 14.5897C114.436 12.6671 116.579 13.4795 116.579 14.1835ZM113.228 19.9515V19.9786C113.228 20.0598 113.338 20.114 113.503 20.114C114.217 20.114 115.974 18.5434 115.617 17.4602L115.645 17.2165L115.48 17.4602C114.217 18.4621 113.228 19.6807 113.228 19.9515Z"
            fill="black"
         />
      </svg>
   );
};

export default LogoText;
